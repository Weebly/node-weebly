# Node Weebly CLI

Command Line Interface (CLI) utility for helping Weebly Developers build apps quicker and easier for App Center and with fewer issues.

The Weebly CLI is open source software which empowers developers to quickly scaffold their Weebly applications.

There are four (4) primary types of apps developers can create:
* [Elements](https://dev.weebly.com/what-are-elements.html)
* [Dashboard Cards](https://dev.weebly.com/what-are-dashboard-cards.html)
* [Backend Services](https://dev.weebly.com/create-a-backend-service.html#backend-service-apps)
* [Snippets](https://dev.weebly.com/create-a-backend-service.html#snippets)

Developers can also create custom [Themes](https://dev.weebly.com/get-started-with-themes.html), however the Weebly CLI does not support themes at this time.

Please see our milestones and issues page to contribute to this open source community resource for Weebly developers.

# Prerequsites

Prior to using the `weebly init` command to initialize a new Weebly app, you will need to have defined the app on [Weebly Developer Admin Portal](https://dev.weebly.com) first, your `client_id` will be required to access any of the [Weebly APIs](https://dev.weebly.com/about-rest-apis.html) or to subscribe and use [Weebly Webhooks](https://dev.weebly.com/use-webhooks.html).

You will need:
* `callback_url` = Endpoint in your app to handle [App Installation and Authorization](https://dev.weebly.com/app-authorization-and-install-flow.html)
* `client_id` = Unique identifier for your app, provided by [Weebly Developer Admin Portal](https://dev.weebly.com)
* `manage_url` = [OPTIONAL] Endpoint in your app for users to configure/manage their instance's settings of your app on their site 
* Webhook `callback_url` = [OPTIONAL] Endpoint in your app if you plan to consume [Weebly Webhooks](https://dev.weebly.com/use-webhooks.html)

## Getting Started

// TODO: Need to make sure this name is available on NPM, if not update this value. Use BREW?

1. Install the Weebly CLI: `npm i -g weebly`
2. View list of commands with help: `weebly -h` -OR- `weebly --help`
3. Initialize a new Weebly App: `weebly init`
4. Change your working directory into the newly created Weebly App Directory `cd <YOUR APP DIR NAME>`

## Usage 

* `init`
* `list`
* `add`
* `delete`
* `validate`

## Authors
* [Daniel Lett](https://github.com/dlett)
* [Robin Whitmore](https://github.com/robinwhitmore)
* [Benjamin Dean](https://github.com/bdeanindy)

## Contributing

Please see the full [CONTRIBUTING](CONTRIBUTING.md) to learn how to:

* Submit new issues
* Engage on existing issues
* Contribute source code

## LICENSE
Please see the full [LICENSE](LICENSE) file for complete information.

## Questions?
If you have any questions or feature requests pertaining to Weebly or this developer tool, please consider asking in either:

* [Weebly Developer Community](https://community.weebly.com/t5/Developers/ct-p/Developers)
* [Issue Tracker](https://github.com/Weebly/node-weebly/issues)

For discretionary developer support issues, please contact us at <dev-support@weebly.com>, and we'll be happy to lend a hand!
