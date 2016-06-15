'use strict';
const common = require('./common');
const articleName = require('minimist')(process.argv.slice(2))._.join(' ');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

return Promise.resolve()
  .then(createSourceDirectory())
  .then(checkArticleName(articleName))
  .then(createMarkdown(articleName))
  .then(notifyFinish())
  .catch(common.printErrorMessage)

function createSourceDirectory() {
  const _e = 'Source directory could not be created';
  return () => new Promise((resolve, reject) => {
    const sourceDirectory = common.sourceDirectory;

    // create source directory
    mkdirp(sourceDirectory, err => err ? reject(new Error(_e)) : resolve());

    // log
    console.log('> creating source directory if not there..');
  });
}

function checkArticleName(articleName) {
  const _e = '!! article name is not given';
  return () => articleName
    ? Promise.resolve(true)
    : Promise.reject(new Error(_e))
}

function createMarkdown(articleName) {
  const _e = '!! Failed to create a scaffold';
  return () => new Promise((resolve, reject) => {
    const slug = common.slugify(articleName);

    // get markdown scaffold
    const scaffold = common.getScaffold(articleName, new Date());

    // create filestream
    const filepath = path.resolve(common.sourceDirectory, `./${slug}.md`);
    const stream = fs.createWriteStream(filepath);

    // write
    stream.end(scaffold, err =>
      err ? reject(new Error(_e)) : resolve()
    );

    // log
    console.log(`> creating a scaffold.. ${filepath}`);
  });
}


function notifyFinish() {
  return () => {
    // log
    console.log('> creating a scaffold done. start writing!');
  }
}
