const writer = require('../writer');

/**
 * Validates the given parameter is a valid dashboard card label.
 *
 * @param {string} value
 */
module.exports = (value) => {
    let res = value.match(/^[a-zA-Z0-9\s]{1,35}$/);
    if(res === null) {
        writer.error('Alphanumeric, but not all numbers. 25 character max');
        return false;
    }

    return true;
};
