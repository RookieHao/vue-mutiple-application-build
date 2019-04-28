#!/usr/bin/env node

let program = require('commander')
program.parse(process.argv)
const [mode,pageModule] = program.args

require('../lib')(mode,pageModule)