const express = require('express');

const auth = require ('../auth');
const database = require('../data/database');

const router = express.Router();

router.get('/', auth.redirectToLoginIfInvalidCookieSent, async (req, res, next) => {
    res.sendFile('views/dashboard.html', {root: '.'});
});

module.exports = router;