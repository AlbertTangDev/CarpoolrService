const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const accessTokenSecret = 'thisisasuperlongsupposedlyrandomaccesstoken';

exports.awaitGeneratePasswordHash = async (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err)
            reject(err);
        resolve(hash);
    });
});

exports.awaitValidatePassword = async (password, passwordHash) => new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, hash) => {
        if (err)
            reject(err);
        resolve(hash);
    });
});

exports.generateJWT = (guid) => {
    return jwt.sign({
        guid: guid
    }, accessTokenSecret);
};

exports.redirectToDashboardIfValidCookieSent = (req, res, next) => {
    try {
        if (Object.keys(req.cookies).length === 0) {
            return next();
        }

        const guid = req.cookies['carpoolr-guid'];
        const token = req.cookies['carpoolr-token'];

        try {
            const decoded = jwt.verify(token, accessTokenSecret);
            if (guid !== decoded.guid) {
                res.clearCookie();
                return next();
            }
            else
                return res.redirect('/dashboard');
        } catch (err) {
            res.clearCookie();
            return next();
        }
    } catch (err) {
        res.clearCookie();
        return next();
    }
}

exports.redirectToLoginIfInvalidCookieSent = (req, res, next) => {
    try {
        if (Object.keys(req.cookies).length === 0) {
            return res.redirect(401, '/login');
        }

        const guid = req.cookies['carpoolr-guid'];
        const token = req.cookies['carpoolr-token'];

        try {
            var decoded = jwt.verify(token, accessTokenSecret);
            if (guid !== decoded.guid)
                return res.clearCookie().redirect(403, '/login');
            else
                return next();
        } catch (err) {
            return res.clearCookie().redirect(500, '/login');
        }
    } catch (err) {
        return res.clearCookie().redirect(400, '/login');
    }
};

exports.checkAuthorizationHeader = (req, res, next) => {
    try {
        const guid = req.header('Carpoolr-Guid');
        const token = req.header('Carpoolr-Token');

        try {
            var decoded = jwt.verify(token, accessTokenSecret);
            if (guid !== decoded.guid)
                res.clearCookie().redirect(403, '/login');
            else
                next();
        } catch (err) {
            res.clearCookie().redirect(500, '/login');
        }
    } catch (err) {
        res.clearCookie().redirect(400, '/login');
    }
};