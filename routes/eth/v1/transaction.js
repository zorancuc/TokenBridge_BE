var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../../../services/validator');
var transactionController = require('../../../controllers/eth/transactionController');

router.get('/tx/receipt/:tx_hash', transactionController.transactionReceipt);

module.exports = router;
