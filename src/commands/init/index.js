const backendService = require('./prompts/backend-service');
const dashboardCard = require('./prompts/dashboard-card');
const element = require('./prompts/element');
const theme = require('./prompts/theme');

const questions = [
    {
        type : 'list',
        name : 'projectType',
        message : 'What type of app are you building?',
        choices: [
            {
                name: 'Backend Service',
                value: backendService.APP_TYPE
            },
            {
                name: 'Element',
                value: element.APP_TYPE
            },
            {
                name: 'Dashboard Card',
                value: dashboardCard.APP_TYPE
            },
            {
                name: 'Theme',
                value: theme.APP_TYPE
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
