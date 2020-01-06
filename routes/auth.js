var express = require('express');
var router = express.Router();
const { validateBody, schemas } = require('../services/validator');
const { validateToken } = require('../services/middleware');
var authController = require('../controllers/auth/authController');

router.post('/login', validateBody(schemas.auth.login), authController.login);
router.post('/register', validateBody(schemas.auth.register), authController.register);
router.get('/user', validateToken, authController.getAuth);

module.exports = router;
