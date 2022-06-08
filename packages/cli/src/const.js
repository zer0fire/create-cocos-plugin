const path = require('path');
const { getCocosPath } = require('./util');

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
const template = `git@github.com:zer0fire/cocos-plugin-template.git`
  

module.exports = {
    templateObj,
    cocosPath,
    assembleHelperPath,
    mainJsonPath,
    srcDirPath,
    panelPath,
    template,
}