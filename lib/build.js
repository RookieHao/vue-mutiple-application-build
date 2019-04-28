const { spawn } = require('child_process')
const path = require('path')
const chalk = require('chalk')
module.exports = function build(moduleList,pageModule){
  let buildList
  if (!moduleList) {
    console.log(chalk.bold.red(`Startup error :No launchable items found`))
    process.exit()
  } else {
    process.env.VUE_APP_Module = pageModule
    if (process.env.VUE_APP_Module === 'undefined') {
      buildList = [...moduleList]
    } else if (!moduleList.includes(process.env.VUE_APP_Module)) {
      console.log(chalk.bold.red(`Startup error :The startup project must be one of '[${moduleList}]'`))
      process.exit()
    } else {
      buildList = [process.env.VUE_APP_Module]
    }
    for (const modulepage of buildList) {
      process.env.VUE_APP_Module = modulepage
      spawn('node', [path.join(__dirname,'../../','/@vue/cli-service/bin/vue-cli-service.js'), 'build --no-clean'], { shell: true, env: process.env, stdio: 'inherit' }).on('close', code => process.exit(code)).on('error', spawnError => console.error(spawnError))
    }
  }
}
