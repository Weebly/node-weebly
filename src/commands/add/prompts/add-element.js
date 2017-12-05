const { prompt } = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'element_name',
        message: 'What is the element\'s name?'
    },
    {
        type: 'input',
        name: 'element_version',
        message: 'What is the element\'s version? The version of an element has to be equal to or less than the app\'s version.',
        validate: () => true // TODO: Semver validation. 
    },
    {
        type: 'list',
        name: 'has_element_icon',
        message: 'Do you have an icon for the element?',
        choices: ['Yes', 'No'],
        validate: (value) => {
            if (value === 'No') {
                writer.warning('You will need to upload an icon before you can submit your app.');
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'icon_path',
        message: 'Enter a path to a local directory where the icon is stored',
        when: (answers) => answers.has_element_icon === 'Yes',
    },
    {
        type: 'list',
        name: 'element_native_settings',
        message: 'Does your element use native Weebly settings?',
        choices: ['Yes', 'No']
    },
    {
        type: 'list',
        name: 'settings_dialog_immediate',
        message: 'Do you want the Settings dialog to open immediately when dropped from the element tray?',
        when: (answers) => answers.element_native_settings === 'Yes',
        choices: ['Yes', 'No']
    }
];

module.exports = async function() {
    let answers = await prompt(questions);
}
