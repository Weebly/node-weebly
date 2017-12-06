const writer = require('../../utils/writer');
const manifestModel = require('../../models/manifest');
const { prompt } = require('inquirer');
const _ = require('lodash');

async function deleteElement(manifest, name) {
    try {
        if (!manifest.findElement(name)) {
            return writer.error(`ERROR: Could not find element with name ${name}.`);
        }

        let confirmed = await prompt([{
            type: 'confirm',
            name: 'confirmed',
            message: `Are you sure you want to delete the element ${name}? This action is irreversible.`
        }]);

        if (confirmed.confirmed) {
            manifest.deleteElement(name);            
        }
    } catch (e) {
        writer.error(e);
    }
}

function deleteDashboardCard(manifest, name) {
    try {
        if (!manifest.findDashboardCard(name)) {
            return writer.error(`ERROR: Could not find dashboard card with name ${name}.`);
        }

        let confirmed = await prompt([{
            type: 'confirm',
            name: 'confirmed',
            message: `Are you sure you want to delete the dashboard card ${name}? This action is irreversible.`
        }]);

        if (confirmed.confirmed) {
            manifest.deleteDashboardCard(name);            
        }
    } catch (e) {
        writer.error(e);
    }
}

module.exports = {
    command(program) {
        program
            .command('delete <type> <name>')
            .description('Delete an item from the manifest.')
            .action(async (type, name) => {
                try {
                    await manifestModel.fromFile();
                } catch (e) {
                    return writer.error(e);
                }

                switch (type) {
                    case 'element':
                        deleteElement(manifestModel, name);
                        break;
                    case 'dashboard-card':
                        deleteDashboardCard(manifestModel, name);
                        break;
                    default:
                        writer.error('Unknown type ' + type);
                }
            });
    }
};
