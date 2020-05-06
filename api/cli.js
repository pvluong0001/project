#!/usr/bin/env node
const yargs = require('yargs');

/** yargs config */
const config = require('./stub/config.js');

const argv = yargs
  .command(...config.controller)
  .command(...config.model)
  .command(...config.middleware)
  .command(...config.route)
  .command(...config.crud)
  .help().alias('h', 'help').argv;

// console.log(argv);

// yargs.usage(`Usage: $0 <command> [options]
// Command list:
//     - create-controller <controller-name>
// `)
// .help('h')
// .alias('h', 'help').argv
//
// yargs.command('create-controller [controllerName]', 'Create Controller', (yargs) => {
//   console.log(yargs);
// }, argv => {
//   console.log(argv);
// })
