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

                await manifestModel.initialize(answers.name);

                await manifestModel.build(answers);
                
                await manifestModel.toFile();

                console.log(chalk`
    Your app has successfully been created!

    Enter your app:

    cd ${answers.name}

    Check out these other commands to continue:

    {blue.bold weebly add element}
    {blue.bold weebly add dashboard-card}
              `);
            });
    }
};
