const { prompt } = require('inquirer');
const _ = require('lodash');
const nameValidator = require('../../../../utils/validators/dashboardCardName-validator');
const intValidator = require('../../../../utils/validators/integer-validator');
const textComponentQuestions = require('./textComponent');
const linkComponentQuestions = require('./linkComponent');
const statComponentQuestions = require('./statComponent');
const actionComponentQuestions = require('./actionComponent');
const welcomeComponentQuestions = require('./welcomeComponent');
const eventComponentQuestions = require('./eventComponent');
const progressComponentQuestions = require('./progressComponent');
const groupComponentQuestions = require('./groupComponent');

const componentQuestions = [
    {
        type: 'list',
        name: 'component_type',
        message: 'What type of component do you want to add?',
        choices: [
            'text',
            'link',
            'stat',
            'action',
            'welcome',
            'event',
            'progress',
            'group'
        ]
    },
    {
        type: 'list',
        name: 'another_component',
        message: 'Would you like to add another component?',
        choices: ['Yes', 'No']
    }
];

module.exports = async () => {
    let defaultCardContent = [];

    // Creating components
    let componentAnswers = await prompt(componentQuestions);
    console.log('Component Answers -- Type: ', componentAnswers.type);
    let componentDetails;

    switch(componentAnswers.type) {
        case 'action':
            console.log('Type: ', type);
            componentDetails = await actionComponentQuestions();
            break;
        case 'event':
            console.log('Type: ', type);
            componentDetails = await eventComponentQuestions();
            break;
        case 'group':
            console.log('Type: ', type);
            componentDetails = await groupComponentQuestions();
            break;
        case 'link':
            console.log('Type: ', type);
            componentDetails = await linkComponentQuestions();
            break;
        case 'progress':
            console.log('Type: ', type);
            componentDetails = await progressComponentQuestions();
            break;
        case 'stat':
            console.log('Type: ', type);
            componentDetails = await statComponentQuestions();
            break;
        case 'text':
            console.log('Type: ', type);
            componentDetails = await textComponentQuestions();
            break;
        case 'welcome':
            console.log('Type: ', type);
            componentDetails = await welcomeComponentQuestions();
            break;
    }

    console.log('Component Details: ', componentDetails);

    // TODO: make sure all components work.

    // TODO: Populate with real component data
    defaultCardContent.push(componentDetails);

    return defaultCardContent;
}