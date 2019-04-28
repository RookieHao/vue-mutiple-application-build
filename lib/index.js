const path = require('path')
const fs = require('fs')
const service = require('./service')
const build = require('./build')
const moduleSrcArray = path.join(process.cwd(), 'src/pages')
const moduleList = fs.readdirSync(moduleSrcArray)
module.exports =function start(mode,pageModule){
  if(mode === 'build'){
    build(moduleList,pageModule)
  }else{
    service(moduleList,mode,pageModule)
  }
}