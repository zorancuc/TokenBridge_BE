var express = require('express');
var router = express.Router();
const { validateToken } = require('../services/middleware');
var path = require('path');

const pia = {
    'v1': require('./pia/v1')
};

const eth = {
    'v1': require('./eth/v1')
};

const bridge = {
    'v1': require('./bridge/v1')
};

/* GET home page. */
// router.get('/', (req, res) => res.send("Futurepia Microservice REST API is working"));

router.use('/api/auth', require('./auth'));
router.use('/api/bridge/v1', validateToken, bridge['v1']);
// router.use('/api/pia/v1', validateToken, pia['v1']);
router.use('/api/pia/v1', pia['v1']);
// router.use('/api/eth/v1', validateToken, eth['v1']);
router.use('/api/eth/v1', eth['v1']);

module.exports = router;
