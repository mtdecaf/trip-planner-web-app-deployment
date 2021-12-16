const express = require('express');
const router = express.Router();
const authorize = require("../middlewares/auth");
const { addEventsController } = require('../controllers/eventController');

router.post("/:tripId", authorize, addEventsController);

module.exports = router;