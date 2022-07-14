import fs from 'fs-extra';
import path from 'node:path';
import process from 'node:process';

import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import figlet from 'figlet';
import chalk from 'chalk';

import { 
  templateObj,
  mainJsonPath,
  panelPath,
  template,
} from './const.js';

const execPromise = promisify(exec)
const spawnPromise = promisify(spawn)
const figletText = promisify(figlet.text);

// TODO: Progress 进度条
// TODO: exec 报错处理和用户显示
// TODO: 项目可配置

function setPluginJSON({ pluginName, projectName }) {
  const mainJson = JSON.parse(fs.readFileSync(mainJsonPath).toString())
  // set
  mainJson['panel-' + projectName] = templateObj
  pluginName 
    ? mainJson['panel-' + projectName]['title'] = pluginName
    : mainJson['panel-' + projectName]['title'] = projectName
  mainJson['panel-' + projectName]['index'] =  "src/panels/" + projectName + "/index.html"
  const openStr = '打开 ' + (pluginName ? pluginName : projectName)
  mainJson['main-menu']['装配工厂/' + openStr] = {
    "message": "assemble-helper:open",
    "params": [projectName]
  }
  // console.log(mainJson)
  // write
  fs.writeFileSync(mainJsonPath, JSON.stringify(mainJson, ' ', 4))
}

function overWriteCopyByFolder(folder, targetPath) {
  // 复制命令运行的目录下 path 文件夹到 targetPath
  const dir = path.join(process.cwd(), '/', folder)
  // console.log(dir, targetPath)
  try {
    fs.copySync(dir, targetPath, {
      overwrite: true
    });
  } catch (e) {
    console.error(e)
  } finally {
    process.exit(0);
  }
}

async function main({ pluginName, projectName, buildDir }) {
  const startLog = await figletText('start add feature')
  console.log(chalk.green(startLog))
  console.log(chalk.green('开始增加应用功能...')) 


  setPluginJSON({ pluginName, projectName })
  const projectPath = path.join(process.cwd(), projectName)
  const targetPath = path.join(panelPath, projectName)
  const packageJSONPath = path.join(process.cwd(), projectName, '/package.json')
  const appTsxPath = path.join(process.cwd(), projectName, 'src/App.tsx')
  const templatePath = path.join(process.cwd(), '/cocos-plugin-template')

  // console.log(projectPath, templatePath)

  await execPromise('rm -rf ' + projectName, { cwd: panelPath })
  await execPromise('mkdir ' + projectName, { cwd: panelPath })

  // console.log(pluginName, projectName, buildDir)
  // pull 代码
  // build 或 move build
  if (!buildDir) {
    buildDir = path.join(projectName, 'build')
    pluginName = pluginName ? pluginName : 'cocos-plugin-template'
    console.log('cloning...')
    // git clone template
    // TODO: progress
    
    const cloneProcess = await execPromise(`git clone ${template}`)
    console.log(cloneProcess.stdout)
    // cloneProcess.stdout.pipe(process.stdout)
    console.log('clone end')
    await execPromise(`git checkout new-feature`, { cwd: templatePath })
    await execPromise('git remote rm origin', { cwd: templatePath })
    await execPromise(`rm -rf .git`, { cwd: templatePath })
    await execPromise(`rm -rf ${projectName}`)
    await execPromise(`mv cocos-plugin-template ${projectName}`)
    const packageJSONStr = fs.readFileSync(packageJSONPath).toString().replace('@projectName', projectName)
    const appTsxStr = fs.readFileSync(appTsxPath).toString().replace('@pluginName', pluginName)
    // 修改名称 @pluginName 和 @projectName 修改成 pluginName 和projectName
    fs.writeFileSync(packageJSONPath, packageJSONStr)
    fs.writeFileSync(appTsxPath, appTsxStr)
    // 安装 node_modules
    console.log('npm installing...')
    // TODO: progress
    const installProcess = await execPromise('npm install', { cwd: projectPath })
    console.log(installProcess.stdout)
    // build
    console.log('npm building...')
    await execPromise('npm run build', { cwd: projectPath })
    // TODO: progress
    await execPromise('git init', { cwd: projectPath })
    console.log('complete!')
  }
  overWriteCopyByFolder(buildDir, targetPath)
}

export default main