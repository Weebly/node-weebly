const { prompt } = require('inquirer');
const _ = require('lodash');

const questions = [
    {
        type: 'input',
        name: 'stat_component_primary_value',
        message: 'Enter the primary statistic to display, does not have to be a number.'
    },
    {
        type: 'input',
        name: 'stat_component_primary_label',
        message: 'Enter the label to display next to the primary statistic, for example unit of measure.'
    },
    {
        type: 'input',
        name: 'has_stat_component_secondary_display',
        message: 'Do you want to display a secondary statistic in addition to the primary statistic? Defaults to `No`',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'stat_component_secondary_value',
        message: 'Select the secondary display type',
        choices: ['sparkline', 'delta'],
        when: (answers) => 'Yes' === answers.has_stat_component_secondary_display
    },
    {
        type: 'input',
        name: 'stat_component_secondary_value',
        message: 'Enter the value or array of values for the secondary statstic.',
        when: (answers) => 'Yes' === answers.has_stat_component_secondary_display
    },
    {
        type: 'input',
        name: 'stat_component_secondary_label',
        message: 'Enter the label to display next to the secondary statistic, for example unit of measure',
        when: (answers) => 'Yes' === answers.has_stat_component_secondary_display
    },
    {
        type: 'input',
        name: 'stat_component_link',
        message: 'Enter the encrypted URL to content for display in a takeover, can include JWT. [OPTIONAL] Leave blank for none.',
    },
];

module.exports = async function () {
    let answers =  await prompt(questions);
    let statComponent = {};

    // Required
    if (answers.stat_component_primary_value) statComponent.primary_value = answers.stat_component_primary_value;
    if (answers.stat_component_primary_lable) statComponent.primary_label = answers.stat_component_primary_label;

    // Optional
    if (answers.stat_component_secondary_display) statComponent.secondary_display = answers.stat_component_secondary_display;
    if (answers.stat_component_secondary_value) statComponent.secondary_value = answers.stat_component_secondary_value; // Only required if `secondary_display` is set
    if (answers.stat_component_secondary_label) statComponent.secondary_label = answers.stat_component_secondary_label;
    if (answers.stat_component_link) statComponent.link = answers.stat_component_link;

    return statComponent;
}
