const writer = require('../../utils/writer');
const manifestModel = require('../../models/manifest');

module.exports = {
    command(program) {
        program
            .command('validate')
            .description('Validate the manifest file against the JSON schema Weebly is expecting.')
            .action(async (type, name) => {
                try {
                    await manifestModel.fromFile();
                } catch (e) {
                    return writer.error(e);
                }

                // TODO: Validation code
            });
    }
};
