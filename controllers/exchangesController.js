/**
* -----------------------------------------------------------------------------
* Accounts controller used to interact with futurepia accounts
* METHODS:
* # exchangeToken
*
* @dated 04th December 2019
* -----------------------------------------------------------------------------
*/

const httpClient = require('../services/httpClient');
const ExchangeOrder = require('../models/ExchangeOrder');
const Transaction = require('../models/Transaction');
const exchangeBalance = require('../models/ExchangeBalance');

module.exports = {
    /**
     * @param  {} req
     * @param  {} res
     * @returns JSON
     */
    exchangePASTA2ERCToken: async (req, res) => {
        try {
            // TODO
            const {pastaToken, erc20token, amount} = req.body;
            console.log(pastaToken, erc20token, amount);
            console.log(req.decoded);
            const user_id = req.decoded.id;

            let balanceData = await exchangeBalance.findOne({ attributes: ['eth_balance', 'pia_balance'], where: {user_id: user_id}})
            let ethBalance = balanceData.dataValues.eth_balance;
            let piaBalance = balanceData.dataValues.pia_balance;

            if ( piaBalance >= amount ) {
                
                balanceData = await exchangeBalance.update({ eth_balance: ethBalance + amount, pia_balance: piaBalance - amount}, {where: {user_id: user_id}})
                res.json({
                    success: true,
                    response: balanceData
                })
            }

        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
    },

    exchangeERC2PASTAToken: async (req, res) => {
        try {
            // TODO
            const {pastaToken, erc20token, amount} = req.body;
            console.log(pastaToken, erc20token, amount);
            console.log(req.decoded);
            const user_id = req.decoded.id;

            let balanceData = await exchangeBalance.findOne({ attributes: ['eth_balance', 'pia_balance'], where: {user_id: user_id}})
            let ethBalance = balanceData.dataValues.eth_balance;
            let piaBalance = balanceData.dataValues.pia_balance;

            if ( ethBalance >= amount ) {
                
                balanceData = await exchangeBalance.update({ eth_balance: ethBalance - amount, pia_balance: piaBalance + amount}, {where: {user_id: user_id}})
                res.json({
                    success: true,
                    response: balanceData
                })
            }

        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }
    },

    getExchangeBalance: async (req, res) => {
        try {
            // TODO
            const user_id = req.decoded.id;
            exchangeBalance.findOne({ attributes: ['eth_balance', 'pia_balance'], where: {user_id: user_id}}).then((balanceData) => {
                let ethBalance = balanceData.dataValues.eth_balance;
                let piaBalance = balanceData.dataValues.pia_balance;
                
                console.log(ethBalance, piaBalance);
                res.json({
                    success: true,
                    ethBalance: ethBalance,
                    piaBalance: piaBalance
                })
            });
            

        } catch (ex) {
            console.log(ex);
            res.status(400).json({ message: ex.message });
        }       
    },
}