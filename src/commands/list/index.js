const writer = require('../../utils/writer');
const manifestModel = require('../../models/manifest');
const _ = require('lodash');

function listElements(manifest) {
    writer.default('Elements:', true);
    let elements = manifest.getElements();
    _.each(elements, element => {
        writer.default(element.name);
    });
}

function listDashboardCards(manifest) {
    let dashboardCards = manifest.getDashboardCards();
    writer.default('Dashboard cards:', true);
    _.each(dashboardCards, card => {
        writer.default(card.name);
    });
}

function listWebhooks(manifest) {
    let webhooks = manifest.getWebhooks();
    writer.default('Callback URL: ' + webhooks.callback_url, true);

    writer.default("\n" + 'Events:', true);
    _.each(webhooks.events, event => {
        writer.default(event);
    });
}

module.exports = {
    command(program) {
        program
            .command('list <type>')
            .description('List the contents of the manifest. Valid arguments: `element[s]`, `dashboard-card[s]`, `webhook[s]`')
            .action(async (type) => {
                try {
                    await manifestModel.fromFile();
                } catch (e) {
                    return writer.error(e);
                }

                switch (type) {
                    case 'element':
                    case 'elements':
                        listElements(manifestModel);
                        break;
                    case 'dashboard-cards':
                    case 'dashboard-card':
                        listDashboardCards(manifestModel);
                        break;
                    case 'webhooks':
                    case 'webhook':
                        listWebhooks(manifestModel);
                        break;
                    default:
                        writer.error('Unknown type ' + type);
                }
            });
    }
};