const httpClient = require('../httpClient');

module.exports = {
    getAccountByWalletId: async (walletId) => {
        try {
            let data = { "usernames": JSON.stringify([walletId]) };
            let response = await httpClient.post('/api/getAccounts', data);
    
            return response;

        } catch (ex) {
            return new Error(ex.message);
        }
    },

    createAccount: async (walletId, password) => {
        try {
            let data = {
                "username": walletId,
                "password": password
            }
            let response = await httpClient.post('/api/createAccount', data);

            return response;

        } catch (ex) {
            return new Error(ex.message);
        }
    },
};