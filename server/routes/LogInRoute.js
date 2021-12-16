const express = require('express');
const router = express.Router();
const {logInController} = require('../controllers/authController');

router.post("/", logInController);

module.exports = router;