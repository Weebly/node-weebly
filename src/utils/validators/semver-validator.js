const writer = require('../writer');

/**
 * Validates the given parameter is a valid version (semver) format.
 * 
 * @param {string} value 
 */
module.exports = (value) => {
    let res = value.match(/\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/ig);
    if(res === null) {
        writer.error('The given url is not a valid semantic version format');
        return false;                
    }

    return true;
}
