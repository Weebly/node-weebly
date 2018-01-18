const writer = require('../writer');
const fs = require('fs');

/**
 * Validates the given parameter is a valid dashboard card icon.
 *
 * @param {string} value
 */
module.exports = async (value) => {
    let res = value.endsWith('icon.svg');
    if(res === null) {
        writer.error('Icons must be an SVG file named `icon.svg`');
        return false;
    }

    let iconExists = await fs.existsSync(value);
    if (!iconExists) {
        writer.error('ERROR: Icon does not exist at the given path.');
        return false;
    }

    return true;
}