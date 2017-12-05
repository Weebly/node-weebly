const { prompt } = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'next_q',
        message: 'NEXT QUESTION'
    }
];

module.exports = async function () {
    return await prompt(questions)
}
