const writer = require('../writer');

/**
 * Validates the given parameter is a valid icon.
 * 
 * @param {string} value 
 */
module.exports = (value) => {
    let res = value.match(/^icon\.svg$/);
    if(res === null) {
        writer.error('Icons must be an SVG file named `icon.svg`');
        return false;                
    }

    return true;
}
