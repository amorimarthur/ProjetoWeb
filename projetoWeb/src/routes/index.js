const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../controllers');

router.get('/', indexController.indexView);

module.exports = router;