const writer = require('../writer');

/**
 * Validates the given parameter is a valid client_id.
 * 
 * @param {string} value 
 */
module.exports = (value) => {

    let res = value.match(/^[a-zA-Z0-9]{10}$/g); // Alphanum with 10 character length requirement
    if(res === null) {
        writer.error('The given client_id is invalid');
        return false;                
    }

    return true;
}
