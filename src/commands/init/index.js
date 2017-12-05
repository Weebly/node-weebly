const manifestModel = require('./manifest-model');
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
        choices: [
            {name: 'Yes'},
            {name: 'No'}
        ]
    },
    {
        type: 'input',
        name: 'manage_app_url',
        message: 'Enter the URL for the page where users can manage the app',
        when: (answers) => {
            return answers.has_external_site === 'Yes';
        },
        validate: (value) => {
            return urlValidator(value, true);
        }
    },
    {
        type: 'list',
        name: 'has_oauth',
        message: 'Will your app require OAuth?',
        choices: [
            {name: 'Yes'},
            {name: 'No'}
        ]
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
        type : 'list',
        name : 'projectType',
        message : 'What type of app are you building?',
        choices: [
            {
                name: 'Backend Service',
                value: 'backend-service'
            },
            {
                name: 'Element',
                value: 'element'
            },
            {
                name: 'Dashboard Card',
                value: 'dashboard-card'
            },
            {
                name: 'Theme',
                value: 'theme'
            }
        ]
    }
];

module.exports = {
    command(program, prompt) {
        program
            .command('init')
            .description('Initialize a Weebly application.')
            .action(() => {
                prompt(questions).then(answers => {
                    switch (answers.projectType) {
                        case backendService.APP_TYPE:
                            backendService.initPrompt(prompt);
                            break;
                        case element.APP_TYPE:
                            element.initPrompt(prompt);
                            break;
                        case dashboardCard.APP_TYPE:
                            dashboardCard.initPrompt(prompt);
                            break;
                        case theme.APP_TYPE:
                            theme.initPrompt(prompt);
                            break;
                    }
                });
            });
    }
};
