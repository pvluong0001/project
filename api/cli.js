#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
// const argv = require('yargs').argv

const yargs = require('yargs')

yargs.usage(`Usage: $0 <command> [options]
Command list:
    - create-controller <controller-name>
`)
.help('h')
.alias('h', 'help').argv

yargs.command('create-controller [controllerName]', 'Create Controller', (yargs) => {
  console.log(yargs);
}, argv => {
  console.log(argv);
})

// const source = fs.readFileSync(path.join(__dirname, 'stub/template/crud-controller.nodejs.stub'), "utf8")
// const template = Handlebars.compile(source);
// const contents = template({test: 123})
//
// fs.writeFile(path.join(__dirname, 'content.js'), contents, err => {
//   if(err)
//     console.log('Cannot create file');
//
//   console.log('Create controller success');
// })
