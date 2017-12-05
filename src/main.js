const program = require('commander');

/**
 * Commands that the app will allow you to run.
 */
const initCommand = require('./commands/init');

/**
 * Initialize some basics about what the program is.
 */
program
    .version('1.0.0')
    .description('Weebly Developer Tools');

/**
 * Add the available commands to the program.
 */
initCommand.command(program);

program.parse(process.argv);
