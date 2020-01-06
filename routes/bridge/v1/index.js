var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../../../services/validator');
var exchangesController = require('../../../controllers/exchangesController');

router.post('/exchange/p2etoken', validateBody(schemas.bridge.tokenExchange), exchangesController.exchangePASTA2ERCToken);
router.post('/exchange/e2ptoken', validateBody(schemas.bridge.tokenExchange), exchangesController.exchangeERC2PASTAToken);
router.get('/exchange/getExchangeBalance', exchangesController.getExchangeBalance);

module.exports = router;
