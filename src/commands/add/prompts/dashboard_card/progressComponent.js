const { prompt } = require('inquirer');
const _ = require('lodash');

const questions = [
    {
        type: 'input',
        name: 'progress_component_label',
        message: 'Enter the label to display for this progress component?'
    },
    {
        type: 'input',
        name: 'progress_component_description',
        message: 'Enter the description to display for this progress component. [OPTIONAL] Leave blank for none'
    },
    {
        type: 'input',
        name: 'progress_component_percentage',
        message: 'Enter an integer (between 0 and 100) for percentage determining how far to fill the progress indicator. Defaults to 100',
    },
    {
        type: 'input',
        name: 'progress_component_percentage_description',
        message: 'Enter the description of the percentage to display under the indicator and next to percentage value. [OPTIONAL] Leave blank for none.',
    },
    {
        type: 'input',
        name: 'progress_component_link',
        message: 'Enter the encrypted URL to content for display in a takeover when the progress component is clicked. [OPTIONAL] Leave blank for none.',
    }
];

module.exports = async function () {
    let answers =  await prompt(questions);
    let progressComponent = {};

    // Required
    progressComponent.label = answers.progress_component_label;
    progressComponent.percentage = (answers.progress_component_percentage)
        ? answers.progress_component_percentage
        : 100
        ;

    // Optional
    if (answers.progress_component_description) progressComponent.description = answers.progress_component_description;
    if (answers.progress_component_percentage_description) progressComponent.percentage_description = answers.progress_component_percentage_description;
    if (answers.progress_component_link) progressComponent.link = answers.progress_component_link;

    return progressComponent;
}
