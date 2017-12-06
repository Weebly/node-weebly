const { prompt } = require('inquirer');
const _ = require('lodash');

const questions = [
    {
        type: 'list',
        name: 'has_tutorial',
        message: 'Do you want to create a tutorial for your element?',
        choices: ['Yes', 'No']
    },
    {
        type: 'list',
        name: 'autopop',
        message: 'Do you want the tutorial to open if it\'s the first time the user has dropped this element onto a page?',
        choices: ['Yes', 'No'],
        when: (answers) => answers.has_tutorial === 'Yes'
    },
    {
        type: 'input', 
        name: 'introduction',
        message: 'Enter the text to used as the introduction for your tutorial',
        when: (answers) => answers.has_tutorial === 'Yes'
    },
    {
        type: 'list',
        name: 'type',
        message: 'Enter the type of tutorial',
        choices: ['steps', 'video', 'topics'],
        when: (answers) => answers.has_tutorial === 'Yes'
    },
    {
        type: 'input',
        name: 'content',
        message: 'Enter a comma separated list of steps in the tutorial',
        when: (answers) => answers.type === 'steps'
    },
    {
        type: 'input',
        name: 'content',
        message: 'Enter the YouTube ID for the video',
        when: answers => answers.type === 'video',
        validator: () => true // todo: validate youtube video ID
    },
    
];

const topicQuestions = [
    {
        type: 'input',
        name: 'label',
        message: 'What is the label for this topic?',
    },
    {
        type: 'input',
        name: 'introduction',
        message: 'Enter the introduction for this topic',
    },
    {
        type: 'list',
        name: 'type',
        message: 'Enter the type',
        choices: ['steps', 'video']
    },
    {
        type: 'input',
        name: 'content',
        message: 'Enter a comma separated list of steps in the tutorial',
        when: (answers) => answers.type === 'steps'
    },
    {
        type: 'input',
        name: 'content',
        message: 'Enter the YouTube ID for the video',
        when: answers => answers.type === 'video',
        validator: () => true // todo: validate youtube video ID
    },
    {
        type: 'list',
        name: 'another_topic',
        message: 'Do you want to add another topic?',
        choices: ['Yes', 'No']
    }
];

module.exports = async function () {
    let answers =  await prompt(questions);

    if (_.isString(answers.content) && answers.type === 'steps') {
        answers.content = _.map(answers.content.split(','), value => value.trim());
    }

    if (answers.type === 'topics') {
        answers.content = [];
        let creatingTopics = true;

        while (creatingTopics) {
            let topicAnswers = await prompt(topicQuestions);
            if (_.isString(topicAnswers.content) && topicAnswers.type === 'steps') {
                topicAnswers.content = _.map(topicAnswers.content.split(','), (value) => {
                    return value.trim();
                });
            }

            if (topicAnswers.another_topic === 'No') {
                creatingTopics = false;
            }

            answers.content.push(_.omit(topicAnswers, ['another_topic']));
        }
    }

    answers.autopop = answers.autopop === 'Yes';

    return answers;
}
