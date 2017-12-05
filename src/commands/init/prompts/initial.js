const { prompt } = require('inquirer');
const urlValidator = require('../../../utils/validators/url-validator');
const writer = require('../../../utils/writer');

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your app? This will be used to create a project directory'
    },
    {
        type : 'input',
        name : 'client_id',
        message : 'Enter your client ID. You find this on your app\'s Admin page.'
    },
    {
        type: 'input',
        name: 'version',
        message: 'Enter the version of this app.'
    },
    {
        type: 'list',
        name: 'has_external_site',
        message: 'Do you have an external web site where users can manage the app?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'manage_app_url',
        message: 'Enter the URL for the page where users can manage the app',
        when: (answers) => answers.has_external_site === 'Yes',
        validate: (value) => {
            return urlValidator(value, true);
        }
    },
    {
        type: 'list',
        name: 'has_oauth',
        message: 'Will your app require OAuth?',
        choices: ['Yes', 'No']
    },
    {
        type: 'checkbox',
        name: 'scopes',
        message: 'What scopes does your app need to access? Access to each API (except user) and webhook requires a specific scope.',
        choices: [
            'read:blog',
            'write:blog',
            'read:site',
            'write:site',
            'read:store-catalog',
            'write:store-catalog',
            'read:store-orders',
            'write:store-orders',
            'read:membership',
            'write:membership'
        ],
        when: (answers) => {
            return answers.has_oauth === 'Yes';
        }
    },
    {
        type: 'input',
        name: 'callback_url',
        message: 'What is the callback URL? This is where Weebly will send responses to.',
        when: (answers) => {
            return answers.has_oauth === 'Yes';
        },
        validate: (value) => {
            return urlValidator(value, true);
        }
    },
    {
        type: 'list',
        name: 'oauth_final_destination',
        message: 'Where should the user return once the app is authorized?',
        choices: [
            {name: 'Editor', value: 'editor'},
            {name: 'Published Site', value: 'publish'},
            {name: 'Manage Page', value: 'manage'},
            {name: 'Dashboard Card', value: 'dashboard_card'}
        ],
        when: (answers) => answers.has_oauth === 'Yes'
    },
    {
        type: 'input',
        name: 'oauth_destination_card_name',
        message: 'What is the name of the dashboard card?',
        when: (answers) => answers.oauth_final_destination === 'dashboard_card'
    },
    {
        type: 'list',
        name: 'is_snippet',
        message: 'Is your app a snippet? Snippets are lines of HTML code that are applied to every page in a site.',
        choices: ['Yes', 'No']
    }
];

module.exports = function () {
    return prompt(questions);
}
