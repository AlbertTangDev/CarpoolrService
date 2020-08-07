const awaitmysql = require('mysql-await');
const uuid = require('uuid');

const awaitcon = awaitmysql.createConnection({
    host: "localhost",
    user: "root",
    password: "P@55w0rd",
    database: "carpoolr"
});

const TryCatchAwait = async (query) => {
    try {
        return result = await awaitcon.awaitQuery(query);
    } catch (err) {
        throw err;
    }
}

/* users table */

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

exports.createUserAccount = async (firstName, lastName, email, passwordHash) => {
    const userGuid = uuid.v4();
    const query = `INSERT INTO users (guid, first_name, last_name, email, password_hash) VALUES ('${userGuid}', '${firstName}', '${lastName}', '${email}', '${passwordHash}')`
    await TryCatchAwait(query);
    return userGuid;
}

/* trips table */

exports.getTripGuidsAndNamesFromOwnerGuid = async (ownerGuid) => {
    const query = `SELECT guid, display_name FROM trips WHERE owner='${ownerGuid}' ORDER BY accessed_date DESC`;
    var entries = await TryCatchAwait(query);

    const tripList = [];
    entries.forEach(entry => {
        const trip = {guid:entry['guid'], displayName: entry['display_name']};
        tripList.push(trip);
    });
    console.log(tripList);
    return tripList;
}

exports.createTrip = async (userGuid, tripName) => {
    const tripGuid = uuid.v4();
    const query = `INSERT INTO trips (guid, owner, display_name) VALUES ('${tripGuid}', '${userGuid}', '${tripName}')`;
    await TryCatchAwait(query);
    return tripGuid;
}

/* riders table */


/* vehicles table */
