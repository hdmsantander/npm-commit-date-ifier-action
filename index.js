const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

  let input = core.getInput('json');

  console.log('The input file selected: ' + input);

  console.log('Changing file input to ' + input + '.modified');

  input = input + '.modified';

  console.log('Setting output...')

  core.setOutput('json', input);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}