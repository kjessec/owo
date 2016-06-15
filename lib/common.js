'use strict';
const path = require('path');

// app root
const rootpath = path.resolve(__dirname, '../');
exports.sourceDirectory = path.resolve(rootpath, './src');
exports.distDirectory = path.resolve(rootpath, './dist');
exports.templatePath = path.resolve(rootpath, './asset/template.jade');
exports.printErrorMessage = (e) => console.error(e.message);
exports.slugify = str => str.replace(/\s/g, '-').toLowerCase();
exports.getScaffold = (articleName, date) => `
title: ${articleName}
description:
date: ${date}
draft: true
---
`;
