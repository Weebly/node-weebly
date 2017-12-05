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
            .action(async function () {
                
                initialPrompt().then(initialAnswers => {
                    settingsPrompt(initialAnswers).then(settingsAnswers => {
                        externalSettingsPrompt().then(externalSettings => {
                            tutorialPrompt().then(tutorialAnswers => {
                                dashboardCardPrompt().then(dashboardCardAnswers => {

                                    manifestModel.build(
                                        initialAnswers,
                                        settingsAnswers,
                                        externalSettings,
                                        tutorialAnswers,
                                        dashboardCardAnswers
                                    );

                                })
                            })
                        })
                    })
                });

                // let settingsAnswers = settingsPrompt(initialAnswers);
                // let externalSettings = externalSettingsPrompt();
                // let tutorialAnswers = tutorialPrompt();
                // let dashboardCardAnswers = dashboardCardPrompt();
    
                // tell user of the great success.
            });
    }
};
