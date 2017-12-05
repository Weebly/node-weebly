const chalk = require('chalk');

module.exports = {
    info: (message) => {
        console.log(chalk.bold.blue(message));
    },
    error: (message) => {
        console.log(chalk.bold.red("\n" + message));
    }
}