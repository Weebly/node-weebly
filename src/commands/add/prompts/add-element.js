const { prompt } = require('inquirer');
const _ = require('lodash');
const writer = require('../../../utils/writer');

const settingsQuestions = require('./element/settings');
const externalSettingsQuestions = require('./element/external-settings');
const tutorialQuestions = require('./element/tutorial');
const iconValidator = require('../../../utils/validators/componentIcon-validator');
const semverValidator = require('../../../utils/validators/semver-validator');
const nameValidator = require('../../../utils/validators/componentName-validator');

const questions = [
    {
        type: 'input',
        name: 'element_name',
        message: 'What is the element\'s name?',
        validate: value => nameValidator(value)
    },
    {
        type: 'input',
        name: 'element_version',
        message: 'What is the element\'s version? The version of an element has to be equal to or less than the app\'s version.',
        validate: value => semverValidator(value)
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
        validate: value => iconValidator(value)
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

generatePath = (name) => {
    return 'files/' + name.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = async (manifestModel) => {
    let answers = await prompt(questions);
    let settings;

    if (answers.element_native_settings === 'Yes') {
        settings = await settingsQuestions();
    }
    let externalSettings = await externalSettingsQuestions();
    let tutorial = await tutorialQuestions();

    let iconPath;
    if (answers.has_element_icon === 'Yes') {
        iconPath = answers.icon_path;
    }

    let values = {
        name: answers.element_name,
        path: generatePath(answers.element_name),
        version: answers.element_version,
        config: {
            autopop: answers.settings_dialog_immediate === 'Yes'
        },
        properties: settings
    };

    if (externalSettings.create_external_setting === 'Yes') {
        values.config.external = {
            url: externalSettings.url,
            label: externalSettings.label,
            height: externalSettings.height,
            width: externalSettings.width,
            modal: externalSettings.weebly_interactable === 'No',
            fullscreen: false,
        }
    }

    if (tutorial.has_tutorial === 'Yes') {
        values.tutorial = _.omit(tutorial, ['has_tutorial']);
    }

    try {
        await manifestModel.addElement(values, iconPath);

        manifestModel.toFile();
    } catch (e) {
        writer.error(e);
    }
}
