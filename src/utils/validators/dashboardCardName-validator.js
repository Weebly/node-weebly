const writer = require('../writer');

/**
 * Validates the given parameter is a valid dashboard card name.
 * 
 * @param {string} value 
 */
module.exports = (value) => {
    let res = value.match(/^[a-zA-Z0-9]{1,25}$/);
    if(res === null) {
        writer.error('Alphanumeric, but not all numbers. 25 character max');
        return false;                
    }

    return true;
}
