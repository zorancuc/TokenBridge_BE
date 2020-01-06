var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../../../services/validator');
var accountController = require('../../../controllers/eth/accountController');

router.post('/create', accountController.createAccount);
router.post('/balance', validateBody(schemas.eth.account.getEthBalance), accountController.getEthBalance);
router.post('/tokenBalance', validateBody(schemas.eth.account.getTokenBalance), accountController.getTokenBalance);
router.post('/transfer', validateBody(schemas.eth.account.transfer), accountController.transfer);
router.post('/transferToken', accountController.transferToken);

module.exports = router;
