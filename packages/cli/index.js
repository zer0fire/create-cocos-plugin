// import { Command } from 'commander';
// const program = new Command();
// import readLine from 'readline';
// const rl = readLine.createInterface(process.stdin, process.stdout)
import figlet from 'figlet';
import chalk from 'chalk';
import inquirer from 'inquirer';
import process from 'process';
import { promisify } from 'util';
import { exec } from 'child_process';
import assembleHelperSetting from './src/createAssembleHelper.js';

const execPromise = promisify(exec)
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
    // console.log(answer)
    try {
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
            const { buildDir } = await inquirer.prompt([
                { type: 'input', name: 'buildDir', message: '打包文件（可选）:' }
            ])
            await assembleHelperSetting({ projectName, pluginName, buildDir })
        } else if (answer.name === 'addNewPlugin') {
            // TODO: 新增插件
        } else if (answer.name === 'addCocos3Extension') {
            // TODO: 新增 coco3 插件
        }
    } catch(e) {
        console.error(e)
        if (e.message.includes('Error: Command failed: mkdir')) {
            throw new Error('创建文件夹失败')
        }
    } finally {
        await execPromise('rm -rf cocos-plugin-template')
    }
}

async function main() {
    // const argv = process.argv
    // const [ runTimePath, filePath ] = argv
    const edition = /v(.*?)\./.exec(process.version)[1]
    if (Number(edition) < 16) {
        console.log(chalk.bgRed('请升级至 node 16 !'))
        process.exit(1)
    }
    
    await ask()
    process.exit(0)
}
await main();
// program
//     .name('create-cocos-plugin')
//     .description('创建 cocos 插件模板')
//     .version(require('./package.json').version)
//     .parse(process.argv)
//     .argument('<projectName>', '需要一个项目名称')
//     .action((projectName) => {
//         projectName && main(projectName)
//     })

export default main
// 暂时不需要： 通过 commander 定义一个 create-cocos-plugin 入口
// 通过替换 webpack 项目解决 -- 解决 cocos 不兼容 vite 项目的问题


// 新增 assemble-helper 功能
// 项目名（项目路径）
// 插件名（菜单名）