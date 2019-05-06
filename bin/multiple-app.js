#!/usr/bin/env node
const path = require('path')
let program = require('commander')
program.parse(process.argv)
process.env.VUE_CLI_CONTEXT = path.resolve(__dirname,'../lib')
require('../lib')(program.args)
