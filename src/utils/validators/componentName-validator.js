const writer = require('../writer');

/**
 * Validates the given parameter is a valid name.
 * 
 * @param {string} value 
 */
module.exports = (value) => {
    let res = value.match(/^[a-zA-Z0-9]$/g);
    if(res === null) {
        writer.error('The given name is invalid, must be only alphanumeric characters');
        return false;                
    }

    return true;
}
