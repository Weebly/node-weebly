const { prompt } = require('inquirer');
const _ = require('lodash');

const questions = [
    {
        type: 'input',
        name: 'link_component_label',
        message: 'Enter the label to display for this link component.'
    },
    {
        type: 'input',
        name: 'link_component_description',
        message: 'Enter the description to display below this link component. [OPTIONAL] Leave blank for none'
    },
    {
        type: 'input',
        name: 'link_component_value',
        message: 'Enter the content to display as the link text. [OPTIONAL] Leave blank for none',
    },
    {
        type: 'input',
        name: 'has_link_component_style',
        message: 'Do you want to include a predefined style for this link?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'link_component_style',
        message: 'Which predefined style would you like to apply to this link component?',
        choices: ['warning', 'info'],
        when: (answers) => 'Yes' === answers.has_link_component_style
    },
    {
        type: 'input',
        name: 'link_component_link',
        message: 'Encrypted URL to content displayed in takeover when the link is clicked, can include JWT.'
    },
    {
        type: 'input',
        name: 'link_component_disable_when_empty',
        message: 'Disable this link component when the `value` property evaluates to falsy? Defaults to `false`',
        choices: ['Yes', 'No']
    }
];

module.exports = async function () {
    let answers =  await prompt(questions);
    let linkCommponent = {};

    // Required
    if (answers.link_component_label) linkCommponent.label = answers.link_component_label;
    if (answers.link_component_link) linkCommponent.link = answers.link_component_link;
    if ('Yes' === answers.has_link_component_style) linkCommponent.style = answers.link_component_style;

    // Optional
    if (answers.link_component_value) linkCommponent.value = answers.link_component_value;
    if (answers.link_component_description) linkCommponent.description = answers.link_component_description;
    if ('Yes' === answers.link_component_disable_when_empty) linkComponent.disable_when_empty = true;

    return linkCommponent;
}
