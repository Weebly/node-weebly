const { prompt } = require('inquirer');
const urlValidator = require('../../../utils/validators/url-validator');

const questions = [
    {
        type: 'input',
        name: 'callback_url',
        message: 'What is the callback_url for webhooks. This URL will receive webhook payloads.',
        validate: value => urlValidator(value)
    },
    {
        type: 'checkbox',
        name: 'events',
        message: 'Select the webhook events to subscribe. Apps including dashboard cards must subscribe to dashboard.card.update webhook events.',
        choices: [
            "user.update",
            "site.update",
            "site.publish",
            "site.copy",
            "site.delete",
            "site.unpublish",
            "store.info",
            "store.category.create",
            "store.category.delete",
            "store.category.update",
            "store.product.create",
            "store.product.delete",
            "store.product.update",
            "store.cart.create",
            "store.cart.update",
            "store.order.create",
            "store.order.update",
            "store.order.pay",
            "store.order.refund",
            "store.order.ship",
            "store.order.return",
            "store.order.cancel",
            "store.coupon.create",
            "store.coupon.delete",
            "store.coupon.update",
            "store.coupon.use"
        ]
    },
];

module.exports = async (manifestModel) => {
    let answers = await prompt(questions);

    manifestModel.setWebhooks(answers);

    manifestModel.toFile();
}
