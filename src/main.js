const program = require('commander');

/**
 * Commands that the app will allow you to run.
 */
const initCommand       = require('./commands/init');
const addCommand        = require('./commands/add');
const listCommand       = require('./commands/list');
const deleteCommand     = require('./commands/delete');
const validateCommand   = require('./commands/validate');

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
validateCommand.command(program);

program.on('--help', () => {
    console.log('');
    console.log('');
    console.log('  # Prerequisites:');
    console.log('');
    console.log('   * Weebly Developer Account');
    console.log('   * Weebly App and API Keys');
    console.log('');
    console.log('   Getting Started Docs: https://dev.weebly.com');
    console.log('');
    console.log('');
});

program.parse(process.argv);
