const express = require('express');

const auth = require ('../auth');
const database = require('../data/database');

const router = express.Router();

router.get('/user/trips', auth.redirectToLoginIfInvalidCookieSent, async (req, res, next) => {
    try {
        const userGuid = req.cookies['carpoolr-guid'];
        const tripGuids = await database.getTripGuidsAndNamesFromOwnerGuid(userGuid);
        res.send(`{"trips":${JSON.stringify(tripGuids)}}`);
    } catch (err) {
        res.status(400).send(err.toString());
    }
});

module.exports = router;