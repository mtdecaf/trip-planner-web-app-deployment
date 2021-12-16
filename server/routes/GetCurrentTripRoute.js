const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth");
const { getCurrentTripController } = require('../controllers/tripController');

// authenticate user, then use the user's email to get trip according to the match.params.tripId
router.get('/:tripId', authorize, getCurrentTripController);

module.exports = router;