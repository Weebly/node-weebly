const { prompt } = require('inquirer');

const questions = [];

module.exports = async function () {
    return await prompt(questions)
}
