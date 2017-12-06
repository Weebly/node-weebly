const { prompt } = require('inquirer');

const questions = [];

module.exports = async () => {
    let answers = await prompt(questions);
}
