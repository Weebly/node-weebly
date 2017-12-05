const { prompt } = require('inquirer');

const questions = [];

module.exports = () => {
    return await prompt(questions)
}
