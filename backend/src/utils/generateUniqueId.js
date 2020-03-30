const crypto = require('crypto');

module.exports = function generateUniqueInd () {
    return crypto.randomBytes(4).toString('HEX');    
}
