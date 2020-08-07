const express = require('express');

const auth = require('../auth');
const database = require('../data/database');

const router = express.Router();

router.get('/', auth.redirectToDashboardIfValidCookieSent, async (req, res, next) => {
    res.sendFile('views/login.html', {root: '.'});
});

router.post('/', async (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password)
        return res.redirect(401, '/login');

    const passwordHash = await database.getPasswordHashFromEmail(req.body.email);
    if (!passwordHash)
        return res.redirect(401, '/login');

    const valid = await auth.awaitValidatePassword(req.body.password, passwordHash);
    if (!valid) 
        return res.redirect(401, './login');

    const guid = await database.getUserGuidFromEmail(req.body.email);
    const accessToken = auth.generateJWT(guid);
    res.set('Carpoolr-Guid', guid);
    res.set('Carpoolr-Token', accessToken);
    res.send();
});

router.get('/createaccount', auth.redirectToDashboardIfValidCookieSent, async (req, res, next) => {
    res.sendFile('createaccount.html', {root: './views'});
});

router.post('/createaccount', async (req, res, next) => {
    console.log(' gets here');
    const emailExists = await database.doesEmailExist(req.body.email);
    if (emailExists) {
        res.redirect('/createaccount');
    }
    else {
        const passwordHash = await auth.awaitGeneratePasswordHash(req.body.password);
        await database.createUserAccount(req.body['first-name'], req.body['last-name'], req.body.email, passwordHash);
        res.redirect('/login');
    }
});

module.exports = router;