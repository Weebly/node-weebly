const { prompt } = require('inquirer');
const _ = require('lodash');

// TODO: can improve by implementing moment.js or similar to provide human friendly entry of event timestamp value
// TODO: Include validators for each component property below (making certain to address required properties)
const questions = [
    {
        type: 'input',
        name: 'event_component_label',
        message: 'Enter the title to display for this text component.'
    },
    {
        type: 'input',
        name: 'event_component_description',
        message: 'Enter the text value to display for this text component. [OPTIONAL] Leave blank for none'
    },
    {
        type: 'input',
        name: 'event_component_link',
        message: 'Enter the encrypted URL for takeover display content, can include a JWT. [OPTIONAL] Leave blank for none.',
    },
    {
        type: 'input',
        name: 'event_component_timestamp',
        message: 'Enter a valid Unix timestamp in GMT associated with this event.',
    }
];

module.exports = async function () {
    let answers =  await prompt(questions);
    let actionComponent = {};

    // Required
    if (answers.event_component_label) eventComponent.label = answers.event_component_title;
    if (answers.event_component_timestamp) eventComponent.timestamp = answers.event_component_timestamp;

    // Optional
    if (answers.event_component_description) eventComponent.desription = answers.event_component_description;
    if (answers.event_component_link) eventComponent.link = answers.event_component_link;

    return actionComponent;
}
