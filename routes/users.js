var express = require('express');
var router = express.Router();

var database = require('../data/database');

/* GET users listing. */
router.get('/get', async (req, res, next) => {
  var user = await database.getUser('atang@bluebeam.com');
  var jsonResult = `{
    "guid": "${user.guid}",
    "email": "${user.email}",
    "displayName": "${user.displayName}"
  }`;
  res.send(jsonResult);
});

router.get('/put', async (req, res, next) => {
  var email = await database.addUser('atang@bluebeam.com', 'atang');
  res.send(email);
});

module.exports = router;