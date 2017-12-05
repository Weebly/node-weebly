const { prompt } = require('inquirer');
const urlValidator = require('../../../utils/validators/url-validator');

const questions = [
    {
        type: 'input',
        name: 'create_external_setting',
        message: 'Do you want to create an external setting?'
    },
    {
        type: 'input',
        name: 'url',
        message: 'Enter the URL to the page where the settings are displayed.',
        validate: (value) => urlValidator(value)
    },
    {
        type: 'input',
        name: 'label',
        message: 'Enter the text to display as the label in the Weebly dialog'
    },
    {
        type: 'input',
        name: 'height',
        message: 'Enter the height for the iframe (in pixels)',
    },
    {
        type: 'input',
        name: 'width',
        message: 'Enter the width for the iframe (in pixels)'
    },
    {
        type: 'list',
        name: 'modal',
        message: 'Do you want the user to be able to interact with the Weebly editor when the settings iframe is displayed?',
        choices: ['Yes', 'No']
    }
];

module.exports = async function () {
    return await prompt(questions)
}
