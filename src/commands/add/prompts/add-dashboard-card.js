const { prompt } = require('inquirer');
const manifest = require('../../../models/manifest');
const writer = require('../../../utils/writer');
const urlValidator = require('../../../utils/validators/url-validator');
const nameValidator = require('../../../utils/validators/componentName-validator');
const semverValidator = require('../../../utils/validators/semver-validator');
const iconValidator = require('../../../utils/validators/componentIcon-validator');

async function initializeOauth(manifest)
{
    if (!_.isString(manifest.data.callback_url)) {
        writer.default('You must have OAuth configured to setup a dashboard card. We will set that up for you now.');
        let oauthAnswers = await prompt(oauthQuestions);
    }
}

const oauthQuestions = [
    {
        type: 'checkbox',
        name: 'scopes',
        message: 'What scopes does your app need to access? Access to each API (except user) and webhook requires a specific scope.',
        choices: [
            'read:blog',
            'write:blog',
            'read:site',
            'write:site',
            'read:store-catalog',
            'write:store-catalog',
            'read:store-orders',
            'write:store-orders',
            'read:membership',
            'write:membership'
        ]
    },
    {
        type: 'input',
        name: 'callback_url',
        message: 'What is the callback URL? This is where Weebly will send responses to.',
        validate: value => urlValidator(value, true)
    },
    {
        type: 'list',
        name: 'oauth_final_destination',
        message: 'Where should the user return once the app is authorized?',
        choices: [
            {name: 'Editor', value: 'editor'},
            {name: 'Published Site', value: 'publish'},
            {name: 'Manage Page', value: 'manage'},
            {name: 'Dashboard Card', value: 'dashboard_card'}
        ],
    },
    {
        type: 'input',
        name: 'oauth_destination_card_name',
        message: 'What is the name of the dashboard card?',
        when: answers => answers.oauth_final_destination === 'dashboard_card'
    },
];

const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the name for your dashboard card? This won't be displayed, but will be used as the ID",
        validate: value => nameValidator(value)
    },
    {
        type: 'input',
        name: 'version',
        message: 'What is the version number for the card?',
        validate: value => semverValidator(value)
    },
    {
        type: 'list',
        name: 'has_multiple_cards',
        message: 'Does your app have more than one dashboard card?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'label',
        message: "Enter a label for this card. This will be appended to the app's name in the title area",
        when: answers => answers.has_multiple_cards === 'Yes',
    },
    {
        type: 'list',
        name: 'has_icon',
        message: 'Do you have an icon for the dashboard card?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'icon_path',
        message: 'Enter the local path to the icon file.',
        validate: value => iconValidator(value),
        when: answers => answers.has_icon === 'Yes'
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter the URL to the page where the user goes when clicking the header of the card. The content will display in a takeover.',
        validate: value => urlValidator(value)
    },
    {
        type: 'list',
        name: 'display_default_card',
        message: 'Do you want a default card to display before receiving any updates from Weebly?',
        choices: ['Yes', 'No']
    },
];

const moreQuestions = [
    {
        message: "Do you want the default card to display a Welcome message? If you choose yes, it's the only component that will display until an update is received."
    },
    {
        message: '(if yes) Enter a headline for the component'
    },
    {
        message: 'Enter text to display below the headline',
    },
    {
        message: 'Enter button text',
    },
    {
        message: 'Enter a URL for the button. Can include JWT.',
    }
];

// What is the name for your dashboard card? This won't be displayed, but will be used as the ID
// What is the version number for the card?
// Does your app have more than one dashboard card?
// (if yes) Enter a label for this card. This will be appended to the app's name in the title area.
// (if no) go to line 12
// Do you have an icon for the dashboard card?
// (if yes) Enter the local path to the icon file.
// (if no) go to line 15
// Enter the URL to the page where the user goes when clicking the header of the card. The content will display in a takeover.
// Do you want a default card to display before receiving any updates from Weebly?
// (if no) END
// (if yes) Do you want the default card to display a Welcome message? If you choose yes, it's the only component that will display until an update is received.
// (if no) go to line 25
// (if yes) Enter a headline for the component
// Enter text to display below the headline
// Enter button text
// Enter a URL for the button. Can include JWT.
// END TOOL
// (if answer to line 19 is no) Do you want to group 2 or more components in your card?
// (if yes) Enter a label for the group
// (if no) go to line 28
// What type of component do you want to display content?
// (if type=text) Do you want the component to have a title? (if no go to line 31)
// (if yes) What is the title for this component
// What text would you like the component to display
// "Do you want the title to appear as a warning (in orange text with orange highlight)?
// (if yes, add code. if no go to line 33)"
// Do you want the component to display an arrow that is a link to takeover content?
// (if yes) Enter the URL to that content. Can include a JWT token.
// (if no go to line 84)
// (if type=link) Enter the label for the link
// Do you want to add a description for the link?
// (if yes) Enter a description (if no go to line 39)
// Do you want the default card to display a text value for the link? (If you choose no, then no text for the link will display, but the label and description still display and the arrow will be the active link)
// (if yes) Enter the text for the link. (if no go to line 41)
// Do you want the link to be disabled when the value property is null?
// (if yes)
// (if no)
// Do you want the link component to display as a warning (an orange icon is displayed to the left of the label)?
// (if yes)
// (if no) Do you want the link component to display as info (a blue icon is displayed to the left of the label)?
// (if yes)
// (if no) go to line 49
// Enter the URL for the link. Can include a JWT token.
// (go to line 84)
// (if type=stat) What do you want the default value to be?
// What do you want the label for the stat to be?
// Do you want to display the difference between the current value of the statistic and a previous value?
// (if yes) Enter the difference. (if no go to line 57)
// Do you want to add a label for the difference?
// (if yes) Enter text for the label. (if no go to line 61)
// Do you want to display a sparkchart?
// (if yes) Enter values to display on the chart. (if no go to line 61)
// Do you want to add a label for the spark chart?
// (if yes) Enter text for the label. (if no go to line 61)
// Do you want to add a link for the stat?
// (if yes) Enter the URL. Can include JWT. 
// (if no go to line 84)
// (if type=action) Enter a label for the component
// Enter a link for the component.
// Do you want to add a plus icon after the label?
// (if yes)
// (if no go to line 84)
// (if type=event) Enter text to be used as a link.
// Do you want to add a description for the link?
// (if yes) Enter text to display below the link.(if no go to line 72)
// Enter the Unix timestamp for the date of the event
// Do you want to display additional information in a takeover?
// (if yes) Enter the URL to the takeover content. Can include JWT
// (if no go to line 84)
// (if type=progress) Enter a label for the component
// Do you want to add a description below the label?
// (if yes) Enter text to display below the link.(if no go to line 79)
// Enter a number to represent the percentage of completion.
// Do you want to add a description below the completion percentage?
// (if yes) Enter text to display below the percentage (if no go to line 82)
// Do you want to display additional information in a takeover?
// (if yes) Enter the URL to the takeover content. Can include JWT (if no go 84)
// Do you want to add another component?
// (if yes loop thru lines 28-84 until the answer is no)
// Do you want to add another group?
// (if yes, loop thru lines 26-84 until the answer is no)
// (if no END)



module.exports = async () => {
    await manifest.fromFile();

    initializeOauth(manifest);

    let answers = await prompt(questions);
}
