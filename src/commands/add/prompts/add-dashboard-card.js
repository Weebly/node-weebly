const { prompt } = require('inquirer');
const _ = require('lodash');
const writer = require('../../../utils/writer');

const defaultCardQuestions = require('./dashboard_card/defaultCard');
const iconValidator = require('../../../utils/validators/dashboardCardIcon-validator');
const semverValidator = require('../../../utils/validators/semver-validator');
const nameValidator = require('../../../utils/validators/dashboardCardName-validator');
const labelValidator = require('../../../utils/validators/dashboardCardLabel-validator');
const urlValidator = require('../../../utils/validators/url-validator');

const questions = [
    {
        type: 'input',
        name: 'dashboard_card_name',
        message: 'What is the dashboard card\'s name?',
        validate: value => nameValidator(value)
    },
    {
        type: 'input',
        name: 'dashboard_card_version',
        message: 'What is the dashboard card\'s version? The version of a dashboard card has to be equal to or less than the app\'s version.',
        default: '0.1.0',
        validate: value => semverValidator(value)
    },
    {
        type: 'list',
        name: 'has_dashboard_card_label',
        message: 'Do you want to include a display label for this dashboard card?',
        choices: ['No', 'Yes'],
        validate: (value) => {
            if (value === 'No') {
                writer.warning('Add a `label` property of type string to this dashboard card to include one later.');
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'dashboard_card_label',
        message: 'Enter the label text to display for in this dashboard card\'s header.',
        when: (answers) => answers.has_dashboard_card_label === 'Yes',
        validate: value => labelValidator(value)
    },
    {
        type: 'list',
        name: 'has_dashboard_card_icon',
        message: 'Do you have an icon for this dashboard card?',
        choices: ['No', 'Yes'],
        validate: (value) => {
            if (value === 'No') {
                writer.warning('If you decide to add one later, it must be a 60x60 pixel SVG file.');
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'dashboard_card_icon_path',
        message: 'Enter the local relative path where the icon.svg is stored',
        when: (answers) => answers.has_dashboard_card_icon === 'Yes',
        validate: value => iconValidator(value)
    },
    {
        type: 'list',
        name: 'has_dashboard_card_link',
        message: 'Display takeover content from a URL when the link is clicked for this dashboard card?',
        choices: ['No', 'Yes'],
        validate: (value) => {
            if (value === 'No') {
                writer.warning('The `link` property can be added to this dashboard card manually later.');
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'dashboard_card_link',
        message: 'Enter the encrypted URL for the takeover content, the JWT will automatically be appended unless explicitly defined with `:jwt`',
        when: (answers) => answers.has_dashboard_card_link === 'Yes',
        validate: value => urlValidator(value)
    }
    /*
    {
        type: 'list',
        name: 'create_default_card_content',
        message: 'Do you want to create default card content now?',
        choices: ['Yes', 'No']
    }
    */
];

generateDashboardCardPath = (name) => {
    return 'dashboard_cards/' + name.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
module.exports = async (manifestModel) => {
    let answers = await prompt(questions);

    let values = {
        name: answers.dashboard_card_name,
        version: answers.dashboard_card_version,
        path: generateDashboardCardPath(answers.dashboard_card_name),
        "default": []
    };

    if ('Yes' === answers.has_dashboard_card_link) {
        values.link = answers.dashboard_card_link;
    }

    if ('Yes' === answers.has_dashboard_card_icon) {
        try {
            await manifestModel.addDashboardCard(values, answers.dashboard_card_icon_path);
            manifestModel.toFile();
        } catch (e) {
            writer.error(e);
        }
    }


    /* TODO: Resolve the issues with all the components for dashboard cards
    if (answers.create_default_card_content === 'Yes') {
        let defaultCardContent = await defaultCardQuestions();
        console.log('defaultCard.js return value :', defaultCardContent);
        values['default'] = defaultCardContent;
    }
    */

    try {
        await manifestModel.addDashboardCard(values);

        manifestModel.toFile();
    } catch (e) {
        writer.error(e);
    }
}
