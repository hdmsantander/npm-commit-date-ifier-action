const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

  // Our github context
  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log(payload);

  // Get commit id and timestamp
  const commitId = payload.commits[0].id;
  const date = payload.commits[0].timestamp;

  // Load JSON
  let input = core.getInput('json');
  let rawdata = fs.readFileSync(input);
  let object = JSON.parse(rawdata);

  // Print loaded object
  console.log('Loaded object is: ' + object);

  // Add our data
  object.commitId=commitId;
  object.date=date;

  // Write it and set the output
  fs.writeFileSync(input,object);
  core.setOutput('json', object);

  // Print it to console for good measure
  console.log('New object is: ' + object);

} catch (error) {
  core.setFailed(error.message);
}