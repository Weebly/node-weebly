import _ from 'lodash';
import path from 'path';
import fs from 'fs';

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
    fromFile() {
        //
    },
    toFile() {
        //
    },
    createSnippetTemplate() {
        //
    },
    initialize(projectName) {
        // create folder from app name.
        // create manifest.json file within.
    },
    build(values) {
        _.merge(data, _.pick(values, [
            'client_id', 
            'version', 
            'manage_app_url', 
            'scopes',
            'callback_url'
        ]));

        if (values.oauth_final_destination === 'dashboard_card') {
            values.oauth_final_destination += values.oauth_destination_card_name;
        }
        data.oauth_final_destination = values.oauth_final_destination;

        if (values.is_snippet) {
            data.snippet = "files/html/shippet.tpl";
            this.createSnippetTemplate();
        }
    },

    addElement() {
        //
    }
}