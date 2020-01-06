var express = require('express');
var router = express.Router();
var account = require('./account');
var transaction = require('./transaction');

router.use('/account', account);
router.use('/trx', transaction);

module.exports = router;
