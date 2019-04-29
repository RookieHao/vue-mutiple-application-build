#!/usr/bin/env node
const path = require('path')
let program = require('commander')
program.parse(process.argv)
const [mode,pageModule] = program.args
process.env.VUE_CLI_CONTEXT = path.resolve(__dirname,'../lib')
require('../lib')(mode,pageModule)
