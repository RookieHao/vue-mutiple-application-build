#!/usr/bin/env node
let program = require('commander')
program.parse(process.argv)
require('../lib')(program.args)
