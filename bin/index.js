#!/usr/bin/env node
var program = require('commander');
var cli = require('../lib/cli.js');

program
  .command('init [name]').description('initialize your react app').action((name) => {
    cli({name});
  })

program.parse(process.argv);