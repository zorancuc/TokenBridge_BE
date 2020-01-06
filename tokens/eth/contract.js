const web3 = require('../../services/web3');
const erc20TokenABI = require('./erc20TokenABI.json');

const {
    GAS,
    GAS_PRICE,
    DEFAULT_ACCOUNT
} = process.env;

const options = {
    from: DEFAULT_ACCOUNT, // default from address
    gasPrice: GAS_PRICE,
    gas: GAS
}

exports.options = options;

exports.erc20TokenContract = (address) => new web3.eth.Contract(erc20TokenABI, address);