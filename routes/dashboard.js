const express = require('express');

const auth = require ('../auth');
const database = require('../data/database');

const router = express.Router();

router.get('/', auth.redirectToLoginIfInvalidCookieSent, async (req, res, next) => {
    res.sendFile('views/dashboard.html', {root: '.'});
});

router.post('/', auth.redirectToLoginIfInvalidCookieSent, async (req, res, next) => {
    if (!req.body || !req.body['trip-name'])
        res.redirect(400, '/dashboard');
    
    const userGuid = req.cookies['carpoolr-guid'];
    const carpoolName = req.body['trip-name'];

    var newGuid = await database.createTrip(userGuid, carpoolName);
    console.log(newGuid);
    res.redirect('/dashboard');
});

module.exports = router;