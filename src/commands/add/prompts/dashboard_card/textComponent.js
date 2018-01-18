const { prompt } = require('inquirer');
const _ = require('lodash');

// TODO: Include validators for each component property below (making certain to address required properties)
const questions = [
    {
        type: 'input',
        name: 'text_component_title',
        message: 'Enter the title to display for this text component? [OPTIONAL] Leave blank for none'
    },
    {
        type: 'input',
        name: 'text_component_value',
        message: 'Enter the text value to display for this text component.'
    },
    {
        type: 'input',
        name: 'text_component_link',
        message: 'Enter the encrypted URL to content for display in a takeover. [OPTIONAL] Leave blank for none.',
    },
    {
        type: 'list',
        name: 'text_component_style',
        message: 'Set a `warning` style on this text component? Defaults to `No`',
        choices: ['Yes', 'No']
    }
];

module.exports = async function () {
    let textComponent = {};
    let answers;

    try {
        answers =  await prompt(questions);
    } catch(e) {
        throw e;
    }

    // Required
    textComponent.value = answers.text_component_value;

    // Optional
    if (answers.text_component_title) textComponent.title = answers.text_component_title;
    if (answers.text_component_link) textComponent.link = answers.text_component_link;
    if ('Yes' === answers.text_component_style) textComponent.style = 'warning';

    return textComponent;
}
