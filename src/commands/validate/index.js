const writer = require('../../utils/writer');
const manifestModel = require('../../models/manifest');
const manifestSchema = require('../../utils/validators/manifest.schema');
const AJV = require('ajv');

// VARS
let validator = new AJV({allErrors: true});
validator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json')); // Include draft 6 schema

module.exports = {
    command(program) {
        program
            .command('validate [pathTomManifestJSON]')
            .description('Validate the manifest file against the JSON schema Weebly is expecting.')
            .action(async (pathToManifestJSON = './manifest.json') => {
                try {
                    await manifestModel.fromFile(pathToManifestJSON);
                } catch (e) {
                    return writer.error(e);
                }
                let validate = validator.compile(manifestSchema); // Load the schema(s)
                let isValid = validate(manifestModel.data); // Validate manifest.json with schema(s)
                if(!isValid) {
                    //writer.error('Whoopsie! Your `manifest.json` file is invalid.');
                    writer.error(validate.errors); // Show all validation errors
                } else {
                    return console.log('Hooray! Your `manifest.json` file is valid');
                }
            });
    }
};
