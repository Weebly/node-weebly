const { prompt } = require('inquirer');
const urlValidator = require('../../utils/validators/url-validator');

const questions = [
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
            {name: 'Dashboard Card', value: 'dashboard-card'}
        ],
        when: (answers) => answers.has_oauth === 'Yes'
    },
    {
        type: 'input',
        name: 'oauth_destination_card_name',
        message: 'What is the name of the dashboard card?',
        when: (answers) => answers.oauth_final_destination === 'dashboard-card'
    },
    {
        type: 'list',
        name: 'has_webhooks',
        message: 'Does your app require webhooks? Webhooks notify your app when certain events happen in Weebly',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'webhook_callback_url',
        message: 'What is the callback_url for webhooks. This URL will receive webhook payloads.',
        when: (answers) => answers.has_webhooks === 'Yes'
    },
    {
        type: 'checkbox',
        name: 'events',
        message: 'What webhooks do you want to subscribe to? If your app includes a dashboard card, you must subscribe to the dashboard.card.update webhook',
        choices: [
            'user.update',
            'site.update',
            'site.publish',
            'site.copy',
            'site.delete',
            'site.unpublish',
            'dashboard.card.update'
        ],
        when: (answers) => answers.has_webhooks === 'Yes'
    },
    {
        type: 'list',
        name: 'is_snippet',
        message: 'Is your app a snippet? Snippets are lines of HTML code that are applied to every page in a site.',
        choices: ['Yes', 'No']
    },
    {
        type: 'list',
        name: 'has_element',
        message: 'Does your app include an element?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'element_name',
        message: 'What is the element\'s name?',
        when: (answers) => answers.has_element === 'Yes'
    },
    {
        type: 'input',
        name: 'element_version',
        message: 'What is the element\'s version? The version of an element has to be equal to or less than the app\'s version.',
        when: (answers) => answers.has_element === 'Yes',
        validate: () => {} // TODO: Semver validation. 
    },
    {
        type: 'list',
        name: 'element_native_settings',
        message: 'Does your element use native Weebly settings? Note: You should design your element settings before attempting to use this wizard.',
        when: (answers) => answers.has_element === 'Yes',
        choices: ['Yes', 'No']
    },
    {
        type: 'list',
        name: 'settings_dialog_immediate',
        message: 'Do you want the Settings dialog to open immediately when dropped from the element tray?',
        when: (answers) => answers.element_native_settings === 'Yes',
        choices: ['Yes', 'No']
    }
];

module.exports = () => {
        return await prompt(questions);
}
