const awaitmysql = require('mysql-await');

const awaitcon = awaitmysql.createConnection({
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
        return result = await awaitcon.awaitQuery(query);
    } catch (err) {
        throw err;
    }
}

exports.doesEmailExist = async (email) => {
    const query = `SELECT * FROM users WHERE email='${email}'`;
    result = await TryCatchAwait(query);
    if (result.length === 0)
        return false;
    return true;
}

exports.getPasswordHashFromEmail = async (email) => {
    const query = `SELECT password_hash FROM USERS WHERE email='${email}'`;
    const result = await TryCatchAwait(query);
    if (result.length === 0)
        return null;
    return result[0].password_hash;
}

exports.getUserGuidFromEmail = async (email) => {
    const query = `SELECT guid FROM users WHERE email='${email}'`;
    const result = await TryCatchAwait(query);
    if (result.length === 0)
        return null;
    return result[0].guid;
}

exports.createUserAccount = async (guid, firstName, lastName, email, passwordHash) => {
    var query = `INSERT INTO users (guid, first_name, last_name, email, password_hash) VALUES ('${guid}', '${firstName}', '${lastName}', '${email}', '${passwordHash}')`
    await TryCatchAwait(query);
    return guid;
}

exports.getUser = async (email, next) => {
    var query = `SELECT * FROM users WHERE email='${email}'`;
    result = await TryCatchAwait(query);
    var user = new User("guid", result[0].email, result[0].display_name);
    return user;
}