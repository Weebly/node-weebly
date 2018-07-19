const _ = require('lodash');
const fs = require('fs');
const fse = require('fs-extra');
const jsonfile = require('jsonfile');
const path = require('path');

// CONSTANTS
// TODO: Implement these later to prevent bugs
const MANIFEST_FILENAME         = 'manifest.json';
const DASHBOARD_CARDS_DIRNAME   = 'dashboard_cards';
const ELEMENTS_DIRNAME          = 'elements';
const WEBHOOKS_DIRNAME          = 'webhooks';
const BACKEND_SERVICES_DIRNAME  = 'backend_services';
const SNIPPETS_DIRNAME          = 'snippets';
const SNIPPETS_FILENAME         = 'snippet.tpl';
const ICON_DEFAULT_FILENAME     = 'icon.svg';
const ICON_EXTENSION            = '.svg';
const BASE_DIR                  = process.cwd();

module.exports = {
    data: {},
    async fromFile(pathToManifestJSON = './manifest.json') {
        try {
            this.data = await jsonfile.readFileSync(pathToManifestJSON);
        } catch (e) {
            throw 'ERROR: Could not read manifest.json';
        }
    },
    async toFile() {
       await jsonfile.writeFileSync('manifest.json', this.data, {spaces: 2});
    },
    async createSnippetTemplate() {
        await fs.mkdirSync('files');
        await fs.mkdirSync('files/html');
        await fs.writeFileSync('files/html/snippet.tpl', '');
    },
    async initialize(projectName) {

        await fs.mkdirSync(projectName);

        let dirname = `${process.cwd()}/${projectName}`;

        process.chdir(dirname);
    },
    async build(values) {
        this.data.manifest = "1";
        _.merge(this.data, _.pick(values, [
            'client_id',
            'version',
            'manage_app_url',
            'scopes',
            'callback_url'
        ]));

        if (values.oauth_final_destination === 'dashboard_card') {
            values.oauth_final_destination += '-' + values.oauth_destination_card_name;
        }
        this.data.oauth_final_destination = values.oauth_final_destination;

        if (values.is_snippet === 'Yes') {
            this.data.snippet = "files/html/snippet.tpl";
            await this.createSnippetTemplate();
        }
    },

    async createElementDirectory(directory) {
        let elementsDirectoryExists = await fs.existsSync('elements');
        if (!elementsDirectoryExists) {
            await fs.mkdirSync('elements');
        }

        let elementDirectoryExists = await fs.existsSync(directory);
        if (!elementDirectoryExists) {
            await fs.mkdirSync(directory);
            await fs.mkdirSync(`${directory}/css`);
            await fs.mkdirSync(`${directory}/html`);
            await fs.mkdirSync(`${directory}/js`);
            await fs.mkdirSync(`${directory}/assets`);
        }
    },
    async createDashboardCardDirectory(directory) {
        console.log('directory: ', directory);
        let parentDirectoryExists = await fs.existsSync(`${process.cwd()}/dashboard_cards`);
        if (!parentDirectoryExists) {
            await fs.mkdirSync(`${process.cwd()}/dashboard_cards`);
        }

        let dashboardCardDirectoryExists = await fs.existsSync(`${process.cwd()}/${directory}`);
        if (!dashboardCardDirectoryExists) {
            await fs.mkdirSync(`${process.cwd()}/${directory}`);
        }
    },

    async moveIcon(iconPath, directory) {
        if(null === iconPath) {
            iconPath = `${path.dirname(require.main.filename)}/src/icons/elementIcon.png`;
            await fs.copyFileSync(iconPath, directory + '/icon.svg');
        } else {
            if (!_.isString(iconPath) || !iconPath.endsWith('.svg')) {
                throw 'ERROR: Icon must be an SVG.';
            }

            let iconExists = await fs.existsSync(iconPath);
            if (!iconExists) {
                throw 'ERROR: Icon does not exist at the given path.';
            }

            await fs.copyFileSync(iconPath, directory + '/icon.svg');
        }
    },
    async addElement(values, iconPath) {
        if (!_.isArray(this.data.elements)) {
            this.data.elements = [];
        }

        await this.createElementDirectory(values.path);
        if (_.isString(iconPath)) {
            await this.moveIcon(iconPath, values.path);
        } else {
            await this.moveIcon(null, values.path);
        }

        this.data.elements.push(values);
    },
    async addDashboardCard(values, iconPath) {
        if (!_.isArray(this.data.dashboard_cards)) {
            this.data.dashboard_cards = [];
        }

        await this.createDashboardCardDirectory(values.path);

        if (_.isString(iconPath)) {
            await this.moveIcon(iconPath, values.path);
        }

        this.data.dashboard_cards.push(_.omit(values, 'path'));
    },
    setWebhooks(values) {
        this.data.webhooks = values;
    },


    getElements() {
        return this.data.elements;
    },
    getWebhooks() {
        return this.data.webhooks;
    },
    getDashboardCards() {
        return this.data.dashboard_cards;
    },

    findElement(name) {
        return _.find(this.data.elements, (element) => element.name === name);
    },
    findDashboardCard(name) {
        return _.find(this.data.dashboard_cards, (card) => card.name === name);
    },

    async deleteElementByName(name) {
        // Removes the element from `manifes.json`
        let newElements = _.reject(this.data.elements, (element) => element.name === name);
        if (_.size(newElements) < _.size(this.data.elements)) {
            this.data.elements = newElements;
            this.toFile();
        }

        let elementDir = `${process.cwd()}/elements/${name}`;
        let elementDirectoryExists = fs.existsSync(elementDir);
        if (elementDirectoryExists) {
            try {
                await fse.remove(elementDir);
            } catch (e) {
                console.error(e);
                throw e;
            }
        } else {
            return console.log('No related directory to delete for this element, but it has been removed from the `manifest.json`');
        }
    },
    async deleteDashboardCardByName(name) {
        // Removes the dashboard-card from `manifes.json`
        let newCards = _.reject(this.data.dashboard_cards, (card) => card.name === name);
        if (_.size(newCards) < _.size(this.data.dashboard_cards)) {
            this.data.dashboard_cards = newCards;
            this.toFile();
        }

        let dashboardCardDir = `${process.cwd()}/dashboard_cards/${name}`;
        let dashboardCardDirectoryExists = fs.existsSync(dashboardCardDir);
        if (dashboardCardDirectoryExists) {
            try {
                await fse.remove(dashboardCardDir);
            } catch (e) {
                console.error(e);
                throw e;
            }
        } else {
            return console.log('No related directory to delete for this dashboard-card, but it has been removed from the `manifest.json`');
        }
    }
};
