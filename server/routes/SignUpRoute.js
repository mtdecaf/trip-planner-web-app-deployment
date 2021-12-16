const express = require('express');
const router = express.Router();
const {signUpController} = require('../controllers/authController');

router.post("/", signUpController);

module.exports = router;