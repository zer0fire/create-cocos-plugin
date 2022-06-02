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
// TODO: assemble-helper
// TODO: 单纯配置 assemble-helper
// TODO: webpack 打包


async function ask() {
    const questions = [
        {
            type: 'list',
            name: 'name',
            message: '选择新增插件类型',
            choices: [
                // 新增 assemble-helper 功能
                { name: '新增 assemble-helper 功能', value: 'assembleHelperSetting' }
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
// TODO: 解决 cocos 不兼容 vite 项目的问题


// 新增 assemble-helper 功能
// 项目名（项目路径）
// 插件名（菜单名）