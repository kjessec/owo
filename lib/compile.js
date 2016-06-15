'use strict';
const common = require('./common');
const glob = require('glob');
const jade = require('jade');
const fs = require('fs');

const template = jade.compile(fs.readFileSync(common.templatePath));

console.log(template);

return Promise.resolve()
  .then(pickFiles(common.sourceDirectory))
  .then(build(common.distDirectory))

function pickFiles(source) {
  const _e = '!! Error during pickFiles';
  return () => new Promise((resolve, reject) => {
    glob(`${source}/**/*.md`, (err, files) =>
      err
      ? reject(new Error(_e))
      : resolve(files)
    );
  });
}


function build(sourcedir, distdir) {
  return files => Promise.all(files.map(buildIndividual)).then(contents => {
    console.log(contents);
  });
}

function buildIndividual(filepath) {
  const _e = '!! File could not be read';
  return new Promise(function(resolve, reject) {
    fs.readFile(filepath, (err, content) =>
      err
      ? reject(new Error(_e))
      : resolve(content.toString())
    );
  });
}
