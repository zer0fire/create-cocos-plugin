const fs = require('fs-extra');
const path = require('path');
const process = require('process');
const { exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec)
// TODO: 获取 cocos creator 的插件路径，
// 获取 assemble-helper 里的 main.json，改 JSON
// 创建新文件夹（参数）
// 拉代码
// build 时移动到对应的文件夹

function getCocosPath() {
  const HOME = process.platform === 'darwin'
    ? process.env.HOME
    : process.env.USERPROFILE

  if (!HOME) {
    if (process.platform === 'darwin') {
      throw new Error('不存在 HOME 环境变量')
    } else {
      throw new Error('不存在 USERPROFILE 环境变量')
    }
  }
  return path.join(HOME, '.CocosCreator')
}

const templateObj = {
  "type": "dockable",
  "title": "panel-defaultName",
  "width": 500,
  "height": 500,
  "main": "dockable/index.js",
  "index": "src/panels/defaultName/index.html",
  "packageName": "assemble-helper"
}

const cocosPath = getCocosPath()
const assembleHelperPath = path.join(cocosPath, '/packages/assemble-helper')
const mainJsonPath = path.join(assembleHelperPath, '/package.json')
const srcDirPath = path.join(assembleHelperPath, '/src')
const panelPath = path.join(srcDirPath, '/panels')

function setPluginJSON({ pluginName, projectName }) {
  const mainJson = JSON.parse(fs.readFileSync(mainJsonPath).toString())
  // set
  mainJson['panel-' + projectName] = templateObj
  pluginName 
    ? mainJson['panel-' + projectName]['title'] = pluginName
    : mainJson['panel-' + projectName]['title'] = projectName
  mainJson['panel-' + projectName]['index'] =  "src/panels/" + projectName + "/index.html"
  const openStr = '打开 ' + (pluginName ? pluginName : projectName)
  mainJson['main-menu']['装配工厂\/' + openStr] = {
    "message": "assemble-helper:open",
    "params": [projectName]
  }
  // console.log(mainJson)
  // write
  fs.writeFileSync(mainJsonPath, JSON.stringify(mainJson, ' ', 4))
}

function overWriteCopyByPath(path, targetPath) {
  const dir = path.join(process.cwd(), '/', path)
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

async function main({ pluginName, projectName, buildPath }) {
  setPluginJSON({ pluginName, projectName })

  await execPromise('mkdir ' + projectName, { cwd: panelPath })
  const projectPath = path.join(panelPath, '/', projectName)
  // pull 代码
  // build 或 move build
  if (!buildPath) {
    
    // git clone template
    await execPromise('git clone template')
    // 修改名称 @pluginName 和 @projectName 修改成 pluginName 和projectName
    const packageJSON = fs.readFileSync(path.join(projectName, 'package.json')).toString().replace('@projectName', projectName)
    const appTsx = fs.readFileSync(path.join(projectName, 'src/App.tsx')).toString().replace('@pluginName', pluginName)
    fs.writeFileSync(packageJSON, path.join(projectName, 'package.json'))
    fs.writeFileSync(appTsx, path.join(projectName, 'src/App.tsx'))
    // 安装 node_modules
    await execPromise('npm i')
    // build
    await execPromise('npm run build')
    // 移动
  }
  overWriteCopyByPath(buildPath, projectPath)
}

module.exports = main