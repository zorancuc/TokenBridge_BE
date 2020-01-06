/**
 * -----------------------------------------------------------------------------
 * Transaction controller for getting information about transactions
 * METHODS:
 * # getBlock
 *
 * @dated 27th November 2019
 * -----------------------------------------------------------------------------
 */

const httpClient = require('../../services/httpClient');

module.exports = {
    
    /**
     * Get futurepia transaction details
     * @param  {} req
     * @param  {} res
     * @returns json
     */
    getBlock: async (req, res) => {
        try {
            let data = {
                "blockNum": req.body.blockNum
            }

            let response = await httpClient.post('/api/getBlock', data);
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
