const chalk = require('chalk');

module.exports = {
    info: (message) => {
        console.log(chalk.bold.blue(message));
    },
    warning: (message) => {
        console.log(chalk.yellow(message));
    },
    error: (message) => {
        console.log(chalk.bold.red("\n" + message));
    },
    default: (message, bold) => {
        if (bold) {
            return console.log(chalk.bold.white(message));
        }
        return console.log(chalk.white(message));
    }
}