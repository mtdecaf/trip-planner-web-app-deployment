const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth");
const { deleteTripController } = require('../controllers/TripController');

router.delete('/:tripId', authorize, deleteTripController);

module.exports = router;