const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    res.send(process.env.MAPBOX_API_ACCESS_TOKEN);
});

module.exports = router;