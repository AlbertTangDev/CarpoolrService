const express = require('express');

const database = require('../data/database');

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.sendFile('views/dashboard.html', {root: '.'});
});

module.exports = router;