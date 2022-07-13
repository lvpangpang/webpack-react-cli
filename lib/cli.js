var fs = require('fs')
var util = require('util')
var path = require('path')
var { exec } = require('child_process')
var exec = util.promisify(exec)

var chalk = require('chalk')
var Spinner = require('cli-spinner').Spinner

var spinner = new Spinner('%s')
spinner.setSpinnerString('|/-\\')

module.exports = async function (config) {
  const { name } = config
  const cwd = process.cwd()
  const tempalteDir = path.join(__dirname, '../template/pc')
  const targetDir = path.join(cwd, name)

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`✖ 当前目录已经存在文件夹${name}`))
    process.exit()
  }

  console.log('正在拉取模板文件...')
  spinner.start()
  const shell = `cp -r ${tempalteDir} ${targetDir}`
  await exec(shell)
  spinner.stop()
  console.log(chalk.green('✔ 模板文件生成成功'))

  console.log(chalk.green(`cd ${name} && yarn && npm start`))
}
