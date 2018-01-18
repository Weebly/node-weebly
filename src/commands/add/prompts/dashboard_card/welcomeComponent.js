const { prompt } = require('inquirer');
const _ = require('lodash');

const questions = [
    {
        type: 'input',
        name: 'welcome_component_headline',
        message: 'Enter the headline text displayed above this welcome component in bold font type.'
    },
    {
        type: 'input',
        name: 'welcome_component_text',
        message: 'Enter the text to display below the welcome component, maximum of 160 characters.'
    },
    {
        type: 'input',
        name: 'welcome_component_action_label',
        message: 'Enter the text to display on the action button of this welcome component.',
    },
    {
        type: 'input',
        name: 'welcome_component_action_link',
        message: 'Enter the encrypted URL to content for display in a takeover, can include JWT.'
    }
];

module.exports = async function () {
    let answers =  await prompt(questions);
    let welcomeComponent = {};

    welcomeComponent.headline = answers.welcome_component_headline;
    welcomeComponent.text = answers.welcome_component_text;
    welcomeComponent.action_label = answers.welcome_component_action_label;
    welcomeComponent.link = answers.welcome_component_link;

    return welcomeComponent;
}
