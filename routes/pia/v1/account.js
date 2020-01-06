var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../../../services/validator');
var accountController = require('../../../controllers/pia/accountController');

router.post('/create', validateBody(schemas.pia.account.createAccount), accountController.createAccount);
router.post('/get', validateBody(schemas.pia.account.getAccount), accountController.getAccount);
router.post('/balance', validateBody(schemas.pia.account.getTokenBalance), accountController.getTokenBalance);
router.post('/transfer', validateBody(schemas.pia.account.transfer), accountController.transfer);
router.post('/transferToken', validateBody(schemas.pia.account.transferToken), accountController.transferToken);

module.exports = router;
