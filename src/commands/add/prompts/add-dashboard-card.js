const { prompt } = require('inquirer');

const questions = [];

module.exports = async function() {
    let answers = await prompt(questions);
}
