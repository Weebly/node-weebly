const manifestModel = require('./manifest-model');

const initialPrompt = require('./prompts/initial');
const settingsPrompt = require('./prompts/settings');
const externalSettingsPrompt = require('./prompts/external-settings');
const tutorialPrompt = require('./prompts/tutorial');
const dashboardCardPrompt = require('./prompts/dashboard-card');

module.exports = {
    command(program) {
        program
            .command('init')
            .description('Initialize a Weebly application.')
            .action(() => {
                let initialAnswers = initialPrompt();
                let settingsAnswers = settingsPrompt(answers);
                let externalSettings = externalSettingsPrompt();
                let tutorialAnswers = tutorialPrompt();
                let dashboardCardAnswers = dashboardCardPrompt();

                manifestModel.build(
                    initialAnswers,
                    settingsAnswers,
                    externalSettings,
                    tutorialAnswers,
                    dashboardCardAnswers
                );
    
                // tell user of the great success.
            });
    }
};
