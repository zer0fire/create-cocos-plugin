import path from 'path';
import { getCocosPath } from './utils.js';

export const templateObj = {
    "type": "dockable",
    "title": "panel-defaultName",
    "width": 500,
    "height": 500,
    "main": "dockable/index.js",
    "index": "src/panels/defaultName/index.html",
    "packageName": "assemble-helper"
}

export const cocosPath = getCocosPath()
export const assembleHelperPath = path.join(cocosPath, '/packages/assemble-helper')
export const mainJsonPath = path.join(assembleHelperPath, '/package.json')
export const srcDirPath = path.join(assembleHelperPath, '/src')
export const panelPath = path.join(srcDirPath, '/panels')
export const template = `git@github.com:zer0fire/cocos-plugin-template.git`
