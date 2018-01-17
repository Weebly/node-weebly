const writer = require('../writer');

/**
 * Validates the given parameter is a valid version (semver) format.
 * 
 * @param {string} value 
 */
module.exports = (value) => {
    let res = value.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/g);
    if(res === null) {
        writer.error('Invalid semantic version format, valid example: 1.0.0');
        return false;                
    }

    return true;
}
