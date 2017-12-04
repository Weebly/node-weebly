const inquirer = require('inquirer');
const chalk = require('chalk');

let manifestValues = {
    manifest: 1,
    client_id: null,
    version: null,
    manage_app_url: null,
    scopes: [],
    callback_url: null,
    oauth_final_destination: null,
    locale: {
        default: 'en-us',
        supported: ['en-us', 'fr', 'de']
    },
    webhooks: {
        callback_url: null,
        events: []
    },
    snippet: null
};

const questions = [
    {
        type : 'input',
        name : 'client_id',
        message : 'Please enter your Client ID ( How to create: http://bit.ly/2AhX37E ):'
    },
    {
        type: 'input',
        name: 'version',
        message: 'What version is your application?' // TODO: Should we just assume 1.0.0 since this is a new app?
    },
    {
        type: 'input',
        name: 'manage_app_url',
        message: ''
    }
];

module.exports = {
    APP_TYPE: 'backendService',
    APP_NAME: 'backend service',
    writer(message) {
        console.log(chalk.bold.blueBright(message));
    },
    initPrompt(prompt) {
        this.writer('A backend service it is! We\'ll now walk you through the steps to setup your project manifest.');

        prompt(questions).then(answers => {
            //
        });
    }
};
