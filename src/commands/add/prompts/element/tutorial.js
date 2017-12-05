const { prompt } = require('inquirer');

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
        message: 'Enter the text to used as the introduction for your tutorial'
    },
    {
        type: 'list',
        name: 'type',
        message: 'Enter the type of tutorial',
        choices: ['step', 'video', 'topics']
    },
    {
        type: 'input',
        name: 'steps',
        message: 'Enter a comma separated list of steps in the tutorial',
        when: (answers) => answers.type === 'step'
    },
    {
        type: 'input',
        name: 'video_id',
        message: 'Enter the YouTube ID for the video',
        when: answers => answers.type === 'Video',
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
        choices: ['step', 'video']
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

    if (answers.type === 'topics') {
        answers.topics = [];
        let creatingTopics = true;

        while (creatingTopics) {
            let topicAnswers = await prompt(topicQuestions);

            answers.topics.push(topicAnswers);

            if (topicAnswers.another_topic === 'No') {
                creatingTopics = false;
            }
        }
    }

    return answers;
}
