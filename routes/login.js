const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const database = require('../data/database');

const saltRounds = 10;

const router = express.Router();

const awaitPasswordHash = async (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err);
        resolve(hash);
    });
});

router.get('/', async (req, res, next) => {
    res.sendFile('views/login.html', {root: '.'});
});

router.post('/', async (req, res, next) => {
    var passwordHash = await awaitPasswordHash(req.body.password);
    var valid = await database.isValidLogin(req.body.email, passwordHash);
    if (!valid)
        res.sendFile('views/login.html', {root: '.'});
    res.sendFile('dashboard.html', {root: './views'});
});

router.get('/createaccount', async (req, res, next) => {
    res.sendFile('createaccount.html', {root: './views'});
});

router.post('/createaccount', async (req, res, next) => {
    console.log(req.body);
    var emailExists = await database.doesEmailExist(req.body.email);
    if (emailExists) {
        res.sendFile('createaccount.html', {root: './views'});
    }

    var guid = uuid.v4();
    var passwordHash = await awaitPasswordHash(req.body.password);
    await database.createUserAccount(guid, req.body['first-name'], req.body['last-name'], req.body.email, passwordHash);
    res.sendFile('login.html', {root: './views'});
});

module.exports = router;