const { prompt } = require('inquirer');
const _ = require('lodash');

// TODO: Include validators for each component property below (making certain to address required properties)
const questions = [
    {
        type: 'input',
        name: 'action_component_label',
        message: 'Enter the title to display for this text component.'
    },
    {
        type: 'input',
        name: 'action_component_link',
        message: 'Enter the encrypted URL for the content to display in the takeover when this action component link is clicked.'
    },
    {
        type: 'input',
        name: 'action_component_type',
        message: 'Include a `+` icon after the link text for this component? Defaults to `No`',
        choices: ['Yes', 'No']
    }
];

module.exports = async function () {
    let answers =  await prompt(questions);
    let actionComponent = {};

    if (answers.action_component_label) actionComponent.title = answers.action_component_label;
    if (answers.action_component_link) actionComponent.link = answers.action_component_link;
    if ('Yes' === answers.action_component_type) actionComponent.style = 'add';

    return actionComponent;
}
