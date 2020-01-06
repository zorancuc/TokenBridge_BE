const axios = require('axios');

const {
    FUTUREPIA_API_URL: futurepiaApiUri
} = process.env;


module.exports = {

    get: (uri, options = {}) => {
        options['headers'] = {
            // 'authorization': 'API-KEY '
        }
        return axios.get(futurepiaApiUri + uri, options)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

    post: (uri, data, options = {}) => {
        options['headers'] = {
            // 'authorization': 'API-KEY '
        }

        return axios.post(futurepiaApiUri + uri, data, options)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

    put: (uri, data, options = {}) => {
        options['headers'] = {
            // 'authorization': 'API-KEY '
        }

        return axios.put(futurepiaApiUri + uri, data, options)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);;
                return false;
            });
    },

    delete: (uri, options = {}) => {
        options['headers'] = {
            // 'authorization': 'API-KEY '
        }

        return axios.delete(futurepiaApiUri + uri, options)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    },

};
