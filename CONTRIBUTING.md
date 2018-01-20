<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Before writing code](#before-writing-code)
- [Install Dependencies](#install-dependencies)
- [Writing code](#writing-code)
- [Submitting Pull Requests](#submitting-pull-requests)
- [QA](#qa)

<!-- /TOC -->
# Before writing code
1. [confirm issue is new](https://github.com/weebly/node-weebly/issues)
  - if not, get involved in previous report of issue
1. [create a new issue](https://github.com/weebly/node-weebly/issues/new)
  - this way, we can give feedback/direction as early as possible to ensure the most successful outcome for your hard work

# Install Dependencies
Weebly CLI uses npm for development and maintenance tasks.
You will need to install the required dependencies in order to contribute to Weebly CLI.

In terminal from root directory of your fork of the fuelux repo:

1. `npm install`

# Writing code
* please ensure your code editor is set to read from `.editorconfig` file and make sure to run default ESLint against any code you write

1. [fork this repository](https://github.com/weebly/node-weebly/fork)
2. clone locally
3. `npm install`
4. create new branch, named after the GH Issue you are resolving
5. make your changes
6. [sync your fork](https://help.github.com/articles/syncing-a-fork/) with the upstream repo
7. commit your changes
  - write meaningful commit messages (NO WIP!)

## Git and Github Conventions
* Limit commits to as few per pull request as sensible, so that the pull request can be focused.
* Mention the issue number in the pull request or pull request number within the issue. Once fixed, use the keyword fixes with the issue number to close the issue.
* Assign yourself or asked to be assigned an issue before working on it.
* Modify pull request generated defaults to reflect entire pull request. This title may be used in the release notes.
    * Bad: Button group updated
    * Better: Button group font updated
    * Best: Button group's large button font weight decreased
* Pull request from your own fork. Remember to sync from the upstream.
* Work on approved for work issues or work "experimentally" with the possibility that the pull request may need to be discussed and modified.
* Ask for clarification if anything is uncertain or you are unfamiliar with the library. This will allow the maintainers to know what shouldn't be assumed and will help the whole community. Some issues may be stubs without any direction.
* Please use the imperative verb in commits. Preference of "add" over "added" or "adding."
* Capitalize the first word and any proper nouns.
* Limit length first line of commit message to 120 characters.
* Periods are not needed at the end.
* Even if you have push rights, do not merge your own pull requests.

# Submitting Pull Requests
All pull requests are validated via [Travis CI](https://travis-ci.org/). If the tests fail and you feel it is a Travis issue, you can [trigger a restart](#travis-ci).

While grunt can run the included unit tests, this isn't a substitute for running tests on your own.

1. run `npm test` to lint & test your code
2. if necessary, rebase and squash to as few commits as practical
3. push to your forked repo
4. submit a pull request to master - for help, visit GitHub's [using pull requests](https://help.github.com/articles/using-pull-requests)
5. Follow your pull request answering questions and making adjustments as appropriate until it is merged

# QA 

To test locally, you will need to create a new testing directory, and then run `npm install <path/to/your/cli/fork>` from within the main directory to get things stood up properly for testing various `weebly` commands to build and modify apps.
