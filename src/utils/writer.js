const chalk = require('chalk');
const util = require('util');

module.exports = {
    info: (message) => {
        console.log(chalk.bold.blue(message));
    },
    warning: (message) => {
        console.log(chalk.yellow(message));
    },
    error: (message) => {
        if(Array.isArray(message)) {
            message.forEach((item) => {
                console.error(chalk.bold.red("\n" + util.inspect(item, false, null)));
            })
        } else {
            console.error(chalk.bold.red("\n" + message));
        }
    },
    default: (message, bold) => {
        if (bold) {
            return console.log(chalk.bold.white(message));
        }
        return console.log(chalk.white(message));
    }
}