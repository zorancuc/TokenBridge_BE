/**
 * -----------------------------------------------------------------------------
 * Transaction controller for getting information about transactions
 * METHODS:
 * # transactionReceipt
 *
 * @dated 28th November 2019
 * -----------------------------------------------------------------------------
 */

const web3 = require('../../services/web3');

module.exports = {
    
    /**
     * Get eth transaction details
     * @param  {} req
     * @param  {} res
     * @returns json
     */
    transactionReceipt: async (req, res) => {
        let txHash = req.params.tx_hash;
        
        if (!txHash) {
            return res.status(422).json({
                message: "invalid transaction hash"
            });
        }
        
        web3.eth.getTransactionReceipt(txHash)
        .then(receipt => {
            let result = {
                success: true,
                status: receipt.status,
                from: receipt.from,
                to: receipt.to,
                tx_hash: receipt.transactionHash
            };
            if (receipt.status && receipt.logs.length > 0) {
                result.data = web3.utils.fromWei(web3.utils.hexToNumberString(receipt.logs[0].data), "ether");
            }
    
            res.json(result);
        })
        .catch(ex => {
            console.log(ex);
            res.status(400).json({
                message: 'Invalid Transaction Hash'
            });
        });
    }

}
