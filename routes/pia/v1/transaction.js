var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../../../services/validator');
var transactionController = require('../../../controllers/pia/transactionController');

router.post('/getBlock', validateBody(schemas.pia.trx.getBlock), transactionController.getBlock);

module.exports = router;
