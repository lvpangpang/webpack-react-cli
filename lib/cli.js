const fs = require('fs')
const util = require('util')
const path = require('path')
const { exec } = require('child_process')
const execPromise = util.promisify(exec)
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner

const spinner = new Spinner('%s')
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

  spinner.start()

  console.log('正在拉取模板文件...')
  const shellTemplate = `cp -r ${tempalteDir} ${targetDir}`
  await execPromise(shellTemplate)
  console.log(chalk.green('✔ 模板文件生成成功'))

  console.log('正在安装项目依赖...')
  const shellModules = ` cd ${name} && yarn`
  await execPromise(shellModules)
  console.log(chalk.green('✔ 项目依赖安装成功'))

  console.log('正在安装webpack-react-admin...')
  const shellAdmin = ` cd ${name} &&  yarn add webpack-react-admin -D`
  await execPromise(shellAdmin)
  console.log(chalk.green('✔ webpack-react-admin 安装成功'))

  spinner.stop()

  console.log(chalk.green(`cd ${name} && npm start`))
}
