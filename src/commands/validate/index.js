const writer = require('../../utils/writer');
const manifestModel = require('../../models/manifest');
const manifestSchema = require('../../utils/validators/schemas/manifest.schema');
const elementSchema = require('../../utils/validators/schemas/element.schema')
const dashboardCardSchema = require('../../utils/validators/schemas/dashboard_card.schema')
const webhooksSchema = require('../../utils/validators/schemas/webhook.schema');
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
                let validate = validator
                    .addSchema(elementSchema, "elements")
                    .addSchema(dashboardCardSchema, "dashboardCards")
                    .addSchema(webhooksSchema, "webhooks")
                    .compile(manifestSchema); // Load the schema(s)
                let isValid = validate(manifestModel.data); // Validate manifest.json with schema(s)
                if(!isValid) {
                    //writer.error('Whoopsie! Your `manifest.json` file is invalid.');
                    return writer.error(validate.errors); // Show all validation errors
                } else {
                    return console.log('Hooray! Your `manifest.json` file is valid');
                }
            });
    }
};
