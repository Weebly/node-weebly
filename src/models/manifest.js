const _ = require('lodash');
const fs = require('fs');
const jsonfile = require('jsonfile');

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
        let filesDirectoryExists = await fs.existsSync('files');
        if (!filesDirectoryExists) {
            await fs.mkdirSync('files');
        }

        let elementDirectoryExists = await fs.existsSync(directory);
        if (!elementDirectoryExists) {
            await fs.mkdirSync(directory);
        }
    },
    async moveIcon(iconPath, directory) {
        if (!iconPath.endsWith('.svg')) {
            throw 'ERROR: Icon must be an SVG.';
        }

        let iconExists = await fs.existsSync(iconPath);
        if (!iconExists) {
            throw 'ERROR: Icon does not exist at the given path.';
        }

        await fs.copyFileSync(iconPath, directory + '/icon.svg');
    },
    async addElement(values, iconPath) {
        if (!_.isArray(this.data.elements)) {
            this.data.elements = [];
        }

        await this.createElementDirectory(values.path);
        if (_.isString(iconPath)) {
            await this.moveIcon(iconPath, values.path);
        }

        this.data.elements.push(values);
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

    deleteElement(name) {
        let newElements = _.reject(this.data.elements, (element) => element.name === name);

        if (_.size(newElements) < _.size(this.data.elements)) {
            this.data.elements = newElements;
            this.toFile();
            return true;
        }

        throw 'ERROR: No elements found with that name.';
    },
    deleteDashboardCard(name) {
        let newCards = _.reject(this.data.dashboard_cards, (card) => card.name === name);

        if (_.size(newCards) < _.size(this.data.dashboard_cards)) {
            this.data.dashboard_cards = newCards;
            this.toFile();
            return true;
        }

        throw 'ERROR: No dashboard cards found with that name.';
    }
};
