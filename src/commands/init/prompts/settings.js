const { prompt } = require('inquirer');

const settingsQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name (to be used in code) for this setting?',
        validate: () => true // todo: alphanumeric
    },
    {
        type: 'input',
        name: 'label',
        message: 'What should the label in the dialog display for this setting'
    },
    {
        type: 'list',
        name: 'type',
        message: 'What type of setting is this?',
        choices: [
            'string',
            'text',
            'int',
            'slider',
            'toggle',
            'radio',
            'select',
            'color',
            'align'
        ]
    },
    {
        type: 'input',
        name: 'min',
        message: 'Enter the minimum number of characters',
        when: (answers) => ['string', 'text'].indexOf(answers.type) >= 0,
        validate: () => true // todo: numeric or null
    },
    {
        type: 'input',
        name: 'max',
        message: 'Enter the maximum number of characters',
        when: (answers) => ['string', 'text'].indexOf(answers.type) >= 0,
        validate: () => true // todo: numeric or null
    },
    {
        type: 'input',
        name: 'min',
        message: 'Enter the minimum value',
        when: (answers) => ['int', 'slider'].indexOf(answers.type) >= 0,
        validate: () => true // todo: numeric or null
    },
    {
        type: 'input',
        name: 'max',
        message: 'Enter the maximum value',
        when: (answers) => ['int', 'slider'].indexOf(answers.type) >= 0,
        validate: () => true // todo: numeric or null
    },
    {
        type: 'list',
        name: 'display_step_button',
        message: 'Do you want this setting to display a Step button that will increment allowed values by a certain amount?',
        when: (answers) => ['int', 'slider'].indexOf(answers.type) >= 0,
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'step',
        message: 'Enter the step increment',
        when: (answers) => answers.display_step_button === 'Yes',
        validate: (value) => true // todo: integer
    },
    {
        type: 'input',
        name: 'radio_options',
        message: 'Enter a name for each selection, separated by commas',
    },
    {
        type: 'list',
        name: 'another_setting',
        message: 'Do you want to add another setting to this group?',
        choices: ['Yes', 'No']
    }
];

const groupQuestions = [
    {
        type: 'list',
        name: 'another_group',
        message: 'Do you want to add another group?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'name',
        message: 'What do you want to name this group?',
        when: (answers) => answers.another_group === 'Yes'
    },
    {
        type: 'input',
        name: 'label',
        message: 'What label should display in the dialog for this group?',
        when: (answers) => answers.another_group === 'Yes'
    }
];

module.exports = async function (answers) {
    if (answers.has_element === 'No') {
        return [];
    }

    let creatingSettings = true;
    let groups = [];
    groups.push({name: 'settings', label: 'Settings', settings: []});
    let currentGroup = 0;

    while (creatingSettings) {
        let settingAnswers = await prompt(settingsQuestions);

        groups[currentGroup].settings.push(settingAnswers);
        
        if (settingAnswers.another_setting === 'No') {
            let groupAnswers = await prompt(groupQuestions);

            if (groupAnswers.another_group === 'Yes') {
                groups.push({name: groupAnswers.name, label: groupAnswers.label, settings: []});
                currentGroup++;
            } else {
                creatingSettings = false;
            }
        }
    }

    return groups;
}