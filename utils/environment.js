// environment.js

require('dotenv').config();

function getCredentials() {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    return { username, password };
}

module.exports = getCredentials;

