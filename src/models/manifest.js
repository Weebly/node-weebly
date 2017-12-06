const _ = require('lodash');
const fs = require('fs');
const jsonfile = require('jsonfile');

module.exports = {
    data: {},
    async fromFile() {
        try {
            this.data = await jsonfile.readFileSync('manifest.json');
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
        await this.moveIcon(iconPath, values.path);

        this.data.elements.push(values);
    },
    setWebhooks(values) {
        this.data.webhooks = values;
    }
}
