/**
* -----------------------------------------------------------------------------
* Accounts controller used to interact with futurepia accounts
* METHODS:
* # createAccount
* # getAccount
* # getTokenBalance
* # transfer
* # transferToken
*
* @dated 27th November 2019
* -----------------------------------------------------------------------------
*/

const randomString = require('randomstring');
const httpClient = require('../../services/httpClient');
const utils = require('../../services/utils/piaUtils');
const FuturepiaAccount = require('../../models/FuturepiaAccount');

module.exports = {
    /**
    * Create an account on futurepia blockchain
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    createAccount: async (req, res) => {
        try {
            FuturepiaAccount.findOne({ where: { user_id: req.decoded.id }})
            .then(async (data) => {
                if (data) {
                    res.status(400).json({ message: 'User already has futurepia account.' });

                } else {
                    let piaPassword = randomString.generate(8);
                    let response = await utils.createAccount(req.decoded.wallet_id, piaPassword);
                    
                    if (response.status == 'fail') {
                        // Account already exist in futurepia blockchain
                        res.status(400).json({ message: response.result.data.message });
                    
                    } else {
                        FuturepiaAccount.create({ 
                            user_id : req.decoded.id,
                            wallet_id: req.decoded.wallet_id,
                            password: piaPassword
                        });
                        
                        res.json({
                            success: true,
                            response: response
                        });
                    }                    
                }
            })
            .catch(err => {
                res.status(400).json({ message: err.message });
            });            
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
    },
    
    /**
    * Get futurepia account details
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    getAccount: async (req, res) => {
        try {
            let response = await utils.getAccountByWalletId(req.decoded.wallet_id);
            
            res.json({
                success: true,
                response: response
            });
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({
                message: ex.message
            });
        }
    },
    
    /**
    * Get token balance of given user
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    getTokenBalance: async (req, res) => {
        try {
            let data = {
                "accounts": JSON.stringify([req.body.account])
            }
            
            console.log(data);
            let response = await httpClient.post('/api/getTokenBalance', data);
            res.json({
                success: true,
                response: response
            });
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({
                message: ex.message
            });
        }
    },
    
    /**
    * Transfer coins to another user
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    transfer: async (req, res) => {
        try {
            let data = {
                "from": req.body.from,
                "from_pwd": req.body.from_pwd,
                "to": req.body.to,
                "amount": req.body.amount,
                "memo": req.body.memo,
                "memo_key": req.body.memo_key
            }
            
            let response = await httpClient.post('/api/transfer', data);
            res.json({
                success: true,
                response: response
            });
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({
                message: ex.message
            });
        }
    },
    
    /**
    * Transfer tokens to another user
    * @param  {} req
    * @param  {} res
    * @returns json
    */
    transferToken: async (req, res) => {
        try {
            let data = {
                "from": req.body.from,
                "wif": req.body.wif,
                "to": req.body.to,
                "amount": req.body.amount,
                "symbol_name": req.body.symbol_name,
                "memo": req.body.memo,
                "memo_key": req.body.memo_key
            }
            
            let response = await httpClient.post('/api/transferToken', data);
            res.json({
                success: true,
                response: response
            });
            
        } catch (ex) {
            console.log(ex);
            res.status(400).json({
                message: ex.message
            });
        }
    },
    
}
