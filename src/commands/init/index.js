const chalk = require('chalk');

const manifestModel = require('../../models/manifest');
const initialPrompt = require('./prompts/initial');

module.exports = {
    command(program) {
        program
            .command('init')
            .description('Initialize a Weebly application.')
            .action(async function () {
                let answers = await initialPrompt();

                manifestModel.initialize(answers.name);

                manifestModel.build(answers);

                console.log(chalk`
    Your app has successfully been created!

    Check out these other commands to continue:

    {blue.bold weebly add element}
    {blue.bold weebly add dashboard-card}
              `);
            });
    }
};
