const writer = require('../writer');

/**
 * Validates the given parameter is a valid `tooltip`.
 * 
 * @param {string} value - the tooltip value from the manifest.json file
 */
module.exports = (value, enforceHttps) => {
    let res = value.match(/^[a-zA-Z0-9\w\s\.\,\!\?\n]{5,100}$/g);
    if(res === null) {
        writer.error('Tooltips cannot contain HTML, CSS, or JS, and have 100 character max length');
        return false;                
    }

    return true;
}
