const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth");
const { getUserTripsController } = require('../controllers/tripController');

// authenticate user, then use the user's email to get trips
router.get('/',authorize, getUserTripsController);

module.exports = router;