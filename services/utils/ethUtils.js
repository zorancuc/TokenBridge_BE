const httpClient = require('../httpClient');
const web3 = require('../../services/web3');
const Contracts = require('../../tokens/eth/contract');

module.exports = {
    createAccount: async () => {
        try {
            let account = await web3.eth.accounts.create();
            return account;
        } catch (ex) {
            return new Error(ex.message);
        }
    },

    getTokenBalance: async (token_address, wallet_address) => {
        let tokenAddr = token_address;
        let walletAddr = wallet_address;
        
        if (!web3.utils.isAddress(tokenAddr)) {
            return "invalid token contract address";
        }
        
        if (!web3.utils.isAddress(walletAddr)) {
            return "invalid wallet address";
        }
        
        try {
            let tokenContract = Contracts.erc20TokenContract(tokenAddr);
            let symbol = await tokenContract.methods.symbol().call();
            // Get decimals
            let decimals = await tokenContract.methods.decimals().call();
            // Call balanceOf function
            let balance = await tokenContract.methods.balanceOf(walletAddr).call();
            balance = balance / (10 ** decimals);
            
            return balance;
            
        } catch (ex) {
            console.log(ex);
            return new Error(ex.message);
        }
    },

    burnToken: async (token_address, wallet_address, tokenValue) => {
        let tokenAddr = token_address;
        let walletAddr = wallet_address;
        // let privateKey = private_key;
        let value = parseFloat(tokenValue);
        
        if (!web3.utils.isAddress(tokenAddr)) {
            return "invalid token contract address";
        }
        
        if (!web3.utils.isAddress(walletAddr)) {
            return "invalid wallet address" ;
        }
        
        const {
            GAS_LOW,
            GAS_PRICE
        } = process.env;
        
        try {
            let tokenContract = Contracts.erc20TokenContract(tokenAddr);
            let symbol = await tokenContract.methods.symbol().call();
            // Get decimals
            let tokenValue = web3.utils.toWei(value.toString(), 'ether');
            console.log(process.env.DEFAULT_ACCOUNT);
            console.log(walletAddr);
            console.log(tokenValue);
            return await tokenContract.methods.burn(walletAddr, tokenValue)
            .send({
                from: process.env.DEFAULT_ACCOUNT,
                value: 0,
                gas: GAS_LOW,
                gasPrice: GAS_PRICE
            });
            
        } catch (ex) {
            console.log(ex);
            return ex.message;
        }
    },

    mintToken: async (token_address, wallet_address, tokenValue) => {
        let tokenAddr = token_address;
        let walletAddr = wallet_address;
        // let privateKey = private_key;
        let value = parseFloat(tokenValue);
        
        if (!web3.utils.isAddress(tokenAddr)) {
            return "invalid token contract address";
        }
        
        if (!web3.utils.isAddress(walletAddr)) {
            return "invalid wallet address" ;
        }
        
        const {
            GAS_LOW,
            GAS_PRICE
        } = process.env;
        
        try {
            let tokenContract = Contracts.erc20TokenContract(tokenAddr);
            let symbol = await tokenContract.methods.symbol().call();
            // Get decimals
            let tokenValue = web3.utils.toWei(value.toString(), 'ether');
            console.log(process.env.DEFAULT_ACCOUNT);
            console.log(walletAddr);
            console.log(tokenValue);
            return await tokenContract.methods.mint(walletAddr, tokenValue)
            .send({
                from: process.env.DEFAULT_ACCOUNT,
                value: 0,
                gas: GAS_LOW,
                gasPrice: GAS_PRICE
            });
            
        } catch (ex) {
            console.log(ex);
            return ex.message;
        }
        
    },
};