const writer = require('../writer');

/**
 * Validates the given parameter is a valid integer.
 * 
 * @param {string} value 
 */
module.exports = (value) => {
    let res = value.match(/^[0-9]{1,78}$/g);
    if(res === null) {
        writer.error('The given value is invalid, must be an integer');
        return false;                
    }

    return true;
}
