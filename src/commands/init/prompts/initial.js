const { prompt } = require('inquirer');
const urlValidator = require('../../../utils/validators/url-validator');
const clientIdValidator = require('../../../utils/validators/clientId-validator');
const semverValidator = require('../../../utils/validators/semver-validator');
const writer = require('../../../utils/writer');

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your app? This will create a project child directory'
    },
    {
        type : 'input',
        name : 'client_id',
        message : 'Enter your client ID. You find this on your app\'s Admin page.',
        validate: (value) => clientIdValidator(value)
    },
    {
        type: 'list',
        name: 'has_external_site',
        message: 'Do you have an external web site where users can manage the app?',
        choices: ['No', 'Yes']
    },
    {
        type: 'input',
        name: 'manage_app_url',
        message: 'Enter the URL for the page where users can manage the app',
        when: (answers) => answers.has_external_site === 'Yes',
        validate: (value) => urlValidator(value, true)
    },
    {
        type: 'list',
        name: 'has_oauth',
        message: 'Will your app require OAuth?',
        choices: ['Yes', 'No'],
        validate: (value) => {
            if ('No' === value) {
                writer.warning('Access to Weebly API and Webhooks require OAuth');
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'version',
        message: 'Enter the version of this app.',
        default: '1.0.0',
        examples: [
            '0.0.1',
            '0.1.0',
            '1.0.0',
            '1.2.3',
            '1.2.34',
            '1.2.131',
            '1.12.123',
            '2.0.0',
            '2.3.0',
            '2.3.9'
        ],
        validate: (value) => semverValidator(value)
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
        when: answers => 'Yes' === answers.has_oauth
    },
    {
        type: 'input',
        name: 'callback_url',
        message: 'What is the callback URL? This is where Weebly will send responses to.',
        when: answers => 'Yes' === answers.has_oauth,
        validate: value => urlValidator(value, true)
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
        when: answers => 'Yes' === answers.has_oauth
    },
    {
        type: 'input',
        name: 'oauth_destination_card_name',
        message: 'What is the name of the dashboard card?',
        when: answers => 'dashboard_card' === answers.oauth_final_destination
    },
    {
        type: 'list',
        name: 'is_snippet',
        message: 'Will your app contain a snippet? Snippets are lines of HTML code that are applied to every page in a site.',
        choices: ['No', 'Yes']
    }
];

module.exports = function () {
    return prompt(questions);
}
