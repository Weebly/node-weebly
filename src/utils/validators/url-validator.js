const writer = require('../writer');

/**
 * Validates the given parameter is a valid URL.
 * 
 * @param {string} value 
 */
module.exports = (value, enforceHttps) => {
    if (enforceHttps) {
        let startsWithHttps = value.match(/https:\/\/*/g);
        if (startsWithHttps === null) {
            writer.error('The app URL must begin with https');
            return false;
        }
    }

    let res = value.match(/(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res === null) {
        writer.error('The given url is invalid');
        return false;                
    }

    return true;
}
