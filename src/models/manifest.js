const _ = require('lodash');
const fs = require('fs');
const jsonfile = require('jsonfile');

let base = {
    manifest: 1,
    client_id: null,
    version: null,
    manage_app_url: null,
    scopes: [],
    callback_url: null,
    oauth_final_destination: null,
    webhooks: {
        callback_url: null,
        events: []
    },
    snippet: null
};

module.exports = {
    data: {},
    async fromFile() {
        try {
            this.data = await jsonfile.readFileSync('manifest.json');
        } catch (e) {
            // TODO: Handle file not existing.
            console.log(e);
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

    addElement(values) {
        if (!_.isArray(this.data.elements)) {
            this.data.elements = [];
        }

        this.data.elements.push(values);
    }
}
