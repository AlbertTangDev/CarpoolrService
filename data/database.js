const mysql = require('mysql-await');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "P@55w0rd",
    database: "carpoolr"
});

class User {
    constructor(guid, email, displayName) {
        this.guid = guid;
        this.email = email;
        this.displayName = displayName;
    }
}

async function TryCatchAwait(query) {
    try {
        return result = await con.awaitQuery(query);
    } catch (err) {
        throw err;
    }
}

exports.doesEmailExist = async (email) => {
    var query = `SELECT * FROM users WHERE email='${email}'`;
    result = await TryCatchAwait(query);
    if (result.length === 0)
        return false;
    return true;
}

exports.createUserAccount = async (guid, firstName, lastName, email, passwordHash) => {
    console.log(guid.length+": "+guid);
    var query = `INSERT INTO users (guid, first_name, last_name, email, password_hash) VALUES ('${guid}', '${firstName}', '${lastName}', '${email}', '${passwordHash}')`
    await TryCatchAwait(query);
    return guid;
}

exports.isValidLogin = async (email, passwordHash) => {
    var query = `SELECT * FROM users WHERE email='${email}' AND password_hash = '${passwordHash}'`
    result = await TryCatchAwait(query);
    if (result.length === 0)
        return false;
    return true;
}

exports.getUser = async (email, next) => {
    var query = `SELECT * FROM users WHERE email='${email}'`;
    result = await TryCatchAwait(query);
    var user = new User("guid", result[0].email, result[0].display_name);
    return user;
}