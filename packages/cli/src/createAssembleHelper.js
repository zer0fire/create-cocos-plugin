const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');
// TODO: 获取 cocos creator 的插件路径，
// 获取 assemble-helper 里的 main.json，改 JSON
// 创建新文件夹（参数）
// 拉代码
// build 时移动到对应的文件夹

function getCocosPluginPath() {

}

const templateObj = {

}

function main(pluginName) {
  const cocosPath = getCocosPluginPath()
  const assembleHelperPath = path.join(path, '/assemble-helper')
  const srcDirPath = path.join(assembleHelperPath, '/src')
  const mainJson = fs.readFileSync().toJSON()
  mainJson['panel-' + pluginName] = templateObj
  fs.writeFileSync(mainJson)
  exec('mkdir ' + pluginName, { cwd: srcDirPath })
  // pull 代码
  // build
}

module.exports = main