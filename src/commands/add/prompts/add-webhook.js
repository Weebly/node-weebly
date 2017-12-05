const { prompt } = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'webhook_callback_url',
        message: 'What is the callback_url for webhooks. This URL will receive webhook payloads.'
    },
    {
        type: 'checkbox',
        name: 'events',
        message: 'What webhooks do you want to subscribe to? If your app includes a dashboard card, you must subscribe to the dashboard.card.update webhook',
        choices: [
            'user.update',
            'site.update',
            'site.publish',
            'site.copy',
            'site.delete',
            'site.unpublish',
            'dashboard.card.update'
        ]
    },
];

module.exports = async function() {
    let answers = await prompt(questions);
}
