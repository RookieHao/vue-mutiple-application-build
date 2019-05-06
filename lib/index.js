const path = require('path')
const fs = require('fs')
const service = require('./service')
const build = require('./build')
const moduleSrcArray = path.join(process.cwd(), 'src/pages')
const moduleList = fs.readdirSync(moduleSrcArray)
let options = ['clean']
module.exports =function start([mode,...args]){
  let [pageModule,arg] = args
  if(options.includes(pageModule)){
    pageModule = args[1]
    arg = args[0]
  }
  if(mode === 'build'){
    build(moduleList,pageModule,arg)
  }else{
    service(moduleList,mode,pageModule)
  }
}
