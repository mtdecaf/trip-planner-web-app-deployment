const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth");
const { editTripController } = require('../controllers/tripController');

router.put('/:tripId', authorize, editTripController);

module.exports = router;