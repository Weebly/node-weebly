const { prompt } = require('inquirer');
const urlValidator = require('../../../../utils/validators/url-validator');
const intValidator = require('../../../../utils/validators/integer-validator');

const questions = [
    {
        type: 'list',
        name: 'create_external_setting',
        message: 'Do you want to create an external setting?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'url',
        message: 'Enter the URL to the page where the settings are displayed.',
        validate: (value) => urlValidator(value),
        when: answers => answers.create_external_setting === 'Yes'
    },
    {
        type: 'input',
        name: 'label',
        message: 'Enter the text to display as the label in the Weebly dialog',
        when: answers => answers.create_external_setting === 'Yes'
    },
    {
        type: 'input',
        name: 'height',
        message: 'Enter the height for the iframe (in pixels)',
        when: answers => answers.create_external_setting === 'Yes',
        validate: value => intValidator(value)
    },
    {
        type: 'input',
        name: 'width',
        message: 'Enter the width for the iframe (in pixels)',
        when: answers => answers.create_external_setting === 'Yes',
        validate: value => intValidator(value)
    },
    {
        type: 'list',
        name: 'weebly_interactable',
        message: 'Do you want the user to be able to interact with the Weebly editor when the settings iframe is displayed?',
        choices: ['Yes', 'No'],
        when: answers => answers.create_external_setting === 'Yes'
    }
];

module.exports = async function () {
    return await prompt(questions)
}
