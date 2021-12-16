const express = require('express');
const router = express.Router();
const { addTripController } = require('../controllers/tripController');

router.post("/", addTripController);

module.exports = router;