const program = require('commander');

/**
 * Commands that the app will allow you to run.
 */
const initCommand = require('./commands/init');
const addCommand = require('./commands/add');
const listCommand = require('./commands/list');
const deleteCommand = require('./commands/delete');

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
addCommand.command(program);
listCommand.command(program);
deleteCommand.command(program);

program.parse(process.argv);
