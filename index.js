const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

  // Our github context
  const payload = github.context.payload;

  // Get commit id and timestamp
  const commitId = payload.commits[0].id
  const date = payload.commits[0].timestamp;

  // Load JSON
  let input = core.getInput('json');
  let rawdata = fs.readFileSync(input);
  let object = JSON.parse(rawdata);

  // If object is an array, we affect every object inside the array, if not, just the one
  if (Array.isArray(object)){
    for (const element of object) {
      element.commitId = commitId;
      element.date = date;
    }
  } else {
    object.commitId=commitId;
    object.date=date;
  }

  // Stringify our output
  const result = JSON.stringify(object);

  // Write it and set the output
  fs.writeFileSync(input,result);
  core.setOutput('json',result);

} catch (error) {
  core.setFailed(error.message);
}