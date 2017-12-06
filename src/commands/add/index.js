const writer = require('../../utils/writer');
const manifestModel = require('../../models/manifest');

const addElement = require('./prompts/add-element');
const addDashboardCard = require('./prompts/add-dashboard-card');
const addWebhook = require('./prompts/add-webhook');

module.exports = {
    command(program) {
        program
            .command('add <type>')
            .description('Add an element, dashboard-card or webhook to the manifest.')
            .action(async (type) => {
                await manifestModel.fromFile();

                switch (type) {
                    case 'element':
                        addElement(manifestModel);
                        break;
                    case 'dashboard-card':
                        addDashboardCard(manifestModel);
                        break;
                    case 'webhook':
                        addWebhook(manifestModel);
                        break;
                    default:
                        writer.error('Unknown type ' + type);
                }
            });
    }
};