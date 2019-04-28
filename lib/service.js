const { spawn } = require('child_process')
const chalk = require('chalk')
module.exports = function service(moduleList,mode,pageModule){
  const cmds = { serve: 'runProject', lint: 'lintProject', test: 'test:unitProject' }
  if (!moduleList.length) {
    console.log(chalk.bold.red(`Startup error :No launchable items found`))
    process.exit()
  } else {
    process.env.VUE_APP_Module = pageModule || moduleList[0]
    if (!moduleList.includes(process.env.VUE_APP_Module)) {
      console.log(chalk.bold.red(`Startup error :The startup project must be one of '[${moduleList}]'`))
      process.exit()
    } else {
      spawn('npm', ['run', cmds[mode]], { shell: true, env: process.env, stdio: 'inherit' }).on('data', () => {
        console.log(chalk.green(process.env.VUE_APP_Module + ' run success'))
      }).on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError))
    }
  }
}

