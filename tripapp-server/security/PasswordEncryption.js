require('dotenv').config();
const crypto = require('crypto');
const salt = process.env.SALT;

function generateHashForPassword(password) {
    //var salt = crypto.randomBytes(32).toString('hex');
    return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha1').toString('hex');
}

function valdiatePassword(password, hash) {
    encryptedPasswordToCheck = generateHashForPassword(password);
    return encryptedPasswordToCheck === hash;
}

/*
CODE FOR TESTING

let pass = '12345';
let hashForPass = '363bc2e7c0bec1364063fcd27547147e04f5c9154696555d43f642c0bd5fabc0'
let pass2 = '54321'

console.log(valdiatePassword(pass, hashForPass));
console.log(valdiatePassword(pass2, hashForPass));
*/

module.exports.generateHashForPassword = generateHashForPassword;
module.exports.valdiatePassword = valdiatePassword;