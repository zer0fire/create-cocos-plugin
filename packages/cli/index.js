// const { default: chalk } = require('chalk');
const { Command } = require('commander')
const program = new Command()
const figlet = require('figlet')
const assembleHelperSetting = require('./src/createAssembleHelper');
const chalk = import('chalk')
// const readLine = require('readline')
// const rl = readLine.createInterface(process.stdin, process.stdout)
const inquirer = require('inquirer');
const process = require('process');

// TODO: 行为入口
// TODO: webpack 打包
// TODO: 单独的 plugin ，包含 main.js 等
// TODO: cocos3 的插件 ，包含 main.js 等
// TODO: template 需要包含 react 下的 cocos 组件库

async function ask() {
    const questions = [
        {
            type: 'list',
            name: 'name',
            message: '选择新增插件类型',
            choices: [
                // 新增 assemble-helper 功能
                { name: '新增 assemble-helper 功能', value: 'assembleHelperSetting' },
                { name: '新增独立插件', value: 'addNewPlugin' },
                { name: '新增 cocos3 独立插件', value: 'addCocos3Extension' },
            ]
        }
    ]
    const answer = await inquirer.prompt(questions)
    console.log(answer)
    if (answer.name === 'assembleHelperSetting') {
        // 项目名（项目路径）
        const { projectName } = await inquirer.prompt([
            { type: 'input', name: 'projectName', message: '项目名（项目路径）:' }
        ])
        if (!projectName) {
            console.error('必须要有一个默认项目名')
            process.exit(0)
        }
        // 插件名（菜单名）
        const { pluginName } = await inquirer.prompt([
            { type: 'input', name: 'pluginName', message: '插件名（菜单名，默认为项目名）:' }
        ])
        const { buildPath } = await inquirer.prompt([
            { type: 'input', name: 'buildPath', message: '打包文件（可选）:' }
        ])
        assembleHelperSetting({ projectName, pluginName, buildPath })
    } else if (answer.name === 'addNewPlugin') {
        // TODO: 新增插件
    } else if (answer.name === 'addCocos3Extension') {
        // TODO: 新增 coco3 插件
    }
}

async function main() {
    const argv = process.argv
    const [ runTimePath, filePath ] = argv
    await ask()
    process.exit(0)

}
main();
// program
//     .name('create-cocos-plugin')
//     .description('创建 cocos 插件模板')
//     .version(require('./package.json').version)
//     .parse(process.argv)
//     .argument('<projectName>', '需要一个项目名称')
//     .action((projectName) => {
//         projectName && main(projectName)
//     })

module.exports = main
// 暂时不需要： 通过 commander 定义一个 create-cocos-plugin 入口
// 通过替换 webpack 项目解决 -- 解决 cocos 不兼容 vite 项目的问题


// 新增 assemble-helper 功能
// 项目名（项目路径）
// 插件名（菜单名）