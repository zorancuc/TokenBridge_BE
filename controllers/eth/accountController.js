/**
* -----------------------------------------------------------------------------
* Accounts controller used to interact with futurepia accounts
* METHODS:
* # createAccount
* # getEthBalance
* # getTokenBalance
* # transfer
* # transferToken
*
* @dated 27th November 2019
* -----------------------------------------------------------------------------
*/

const web3 = require('../../services/web3');
const Contracts = require('../../tokens/eth/contract');
const utils = require('../../services/utils/ethUtils');
const EthAccount = require('../../models/EthereumAccount');

module.exports = {
    /**
    * Create an account on eth blockchain
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    createAccount: async (req, res) => {
        try {
            EthAccount.findOne({ where: { user_id: req.decoded.id }})
            .then(async (data) => {
                if (data) {
                    res.status(400).json({ message: 'User already has Ethereum account.' });
                    
                } else {
                    let account = await utils.createAccount();
                    console.log(`Account was created addr: ${account.address}`);
                    
                    EthAccount.create({ 
                        user_id : req.decoded.id ,
                        wallet_address: account.address,
                        private_key: account.privateKey
                    })
                    
                    res.json({
                        success: true,
                        address: account.address,
                        privateKey: account.privateKey
                    });
                }
            })
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
    },
    
    /**
    * Get eth account balance
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    getEthBalance: async (req, res) => {
        
        if (!web3.utils.isAddress(req.body.address)) {
            return res.status(422).json({ message: "invalid address" });
        }
        
        try {
            EthAccount.findOne({ where: { user_id: req.decoded.id }}).then(async (data) => {
                if (data) {
                    let balance = await web3.eth.getBalance(data.wallet_address);    
                    res.json({
                        success: true,
                        address: data.wallet_address,
                        balance: web3.utils.fromWei(balance, "ether")
                    });
                }
            });
        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
    },
    
    /**
    * Get token balance of given wallet
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    getTokenBalance: async (req, res) => {
        let tokenAddr = req.body.token_address;
        let walletAddr = req.body.wallet_address;
        
        if (!web3.utils.isAddress(tokenAddr)) {
            return res.status(422).json({ message: "invalid token contract address" });
        }
        
        if (!web3.utils.isAddress(walletAddr)) {
            return res.status(422).json({ message: "invalid wallet address" });
        }
        
        try {
            let tokenContract = Contracts.erc20TokenContract(tokenAddr);
            let symbol = await tokenContract.methods.symbol().call();
            // Get decimals
            let decimals = await tokenContract.methods.decimals().call();
            // Call balanceOf function
            let balance = await tokenContract.methods.balanceOf(walletAddr).call();
            balance = balance / (10 ** decimals);
            
            res.json({
                success: true,
                token: tokenAddr,
                address: walletAddr,
                balance: balance.toString(),
                symbol: symbol
            });
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
    },
    
    /**
    * Transfer eth to another wallet
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    transfer: async (req, res) => {
        
        let replied = false;
        let toAddr = req.body.address;
        let privateKey = req.body.private_key;
        let value = req.body.value;
        
        if (!web3.utils.isAddress(toAddr)) {
            return res.status(422).json({ message: "invalid address" });
        }
        
        const {
            GAS_LOW,
            GAS_PRICE
        } = process.env;
        
        try {
            let ethValue = parseFloat(value).toFixed(18);
            let account = web3.eth.accounts.wallet.add(privateKey);
            // using the event emitter
            web3.eth.sendTransaction({
                from: account.address,
                to: toAddr,
                value: web3.utils.toWei(ethValue, "ether"),
                gas: GAS_LOW,
                gasPrice: GAS_PRICE
            })
            .on('transactionHash', function (hash) {
                console.log("transaction hash: ", hash);
                web3.eth.accounts.wallet.remove(account.index);
                res.json({
                    success: true,
                    status: 'pending',
                    tx_hash: hash,
                    from: account.address,
                    to: toAddr,
                    value: ethValue
                });
                replied = true;
            })
            .on('receipt', function (receipt) {
                // console.log("receipt: ", receipt);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                // console.log("confirmation", receipt);
            })
            .on('error', error => {
                console.log(error);
                if (!replied) {
                    res.status(400).json({ message: String(error) });
                }
            }); // If a out of gas error, the second parameter is the receipt.
        } catch (ex) {
            console.log(ex);
            if (!replied) {
                res.status(400).json({ message: ex.message });
            }
        }
        
    },
    
    /**
    * Transfer tokens to another wallet
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    transferToken: async (req, res) => {
        let tokenAddr = req.body.token_address;
        let fromAddr = req.body.from_address;
        let toAddr = req.body.to_address;
        let privateKey = req.body.private_key;
        let value = parseFloat(req.body.value);
        
        if (!web3.utils.isAddress(tokenAddr)) {
            return res.status(422).json({ message: "invalid token contract address" });
        }
        
        if (!web3.utils.isAddress(fromAddr)) {
            return res.status(422).json({ message: "invalid wallet address" });
        }

        if (!web3.utils.isAddress(toAddr)) {
            return res.status(422).json({ message: "invalid wallet address" });
        }
        
        const {
            GAS_LOW,
            GAS_PRICE
        } = process.env;
        
        try {
            let tokenContract = Contracts.erc20TokenContract(tokenAddr);
            let symbol = await tokenContract.methods.symbol().call();
            // Get decimals
            // let decimals = await tokenContract.methods.decimals().call();
            let tokenValue = web3.utils.toWei(value.toString(), 'ether');
            accounts = await web3.eth.getAccounts();
            console.log(accounts);
            let fromAccount = process.env.DEFAULT_ACCOUNT;
            
            console.log(fromAccount.address);
            tokenContract.methods.transfer(toAddr, tokenValue)
            .send({
                from: process.env.DEFAULT_ACCOUNT,
                // to: walletAddr,
                value: 0,
                gas: GAS_LOW,
                gasPrice: GAS_PRICE
            })
            .on('transactionHash', function (hash) {
                console.log("transaction hash: ", hash);
                web3.eth.accounts.wallet.remove(fromAccount.index);
                res.json({
                    success: true,
                    status: 'pending',
                    tx_hash: hash,
                    from: fromAccount.address,
                    to: toAddr,
                    value: tokenValue,
                    symbol: symbol
                });
            })
            .on('receipt', function (receipt) {
                // console.log("receipt: ", receipt);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                // console.log("confirmation", receipt);
            })
            .on('error', error => {
                console.log(error);
                res.status(400).json({ message: String(error) });
            }); // If a out of gas error, the second parameter is the receipt.
            
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
        
    },
    
}
