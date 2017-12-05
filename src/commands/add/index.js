const writer = require('../../utils/writer');

const addElement = require('./prompts/add-element');
const addDashboardCard = require('./prompts/add-dashboard-card');
const addWebhook = require('./prompts/add-webhook');

module.exports = {
    command(program) {
        program
            .command('add <type>')
            .description('Add an element, dashboard-card or webhook to the manifest.')
            .action(function (type) {
                switch (type) {
                    case 'element':
                        addElement();
                    case 'dashboard-card':
                        addDashboardCard();
                    case 'webhook':
                        addWebhook();
                    default:
                        writer.error('Unknown type ' + type);
                }
            });
    }
};