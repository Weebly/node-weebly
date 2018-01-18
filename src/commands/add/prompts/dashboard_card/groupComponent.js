const { prompt } = require('inquirer');
const _ = require('lodash');

// TODO: Include validators for each component property below (making certain to address required properties)
const questions = [
    {
        type: 'confirm',
        name: 'add_component_group',
        message: 'Would you like to add a group?',
        default: false
    },
    {
        type: 'input',
        name: 'label',
        message: 'Label display text for this group of components. Default = no label',
        default: ''
    }
];

module.exports = async function () {
    try {
        let answers =  await prompt(questions);
    } catch(e) {
        throw e;
    }
    let groupComponent = {};

    return answers;
}
