# create-cocos-plugin

# TODO
## 命令行工具
  * 两种方式
    1. 通过 assemble-helper
    2. 通过创建一个新的 plugin

## 代码生成器
  * 两种方式
    1. 通过 assemble-helper
    2. 通过创建一个新的 plugin

# Node 包
  * 外部
    * commander
    * chalk
    * figlet
      * webpack?
      * React 模板
      * pnpm monorepo
  * 内部
    * process
    * child_process
    * fs


# mono repo 如何处理 .gitignore?

# mono repo 配置 https://icode.best/i/77424147745096


# Cocos3.x 扩展的路径
# Windows：%USERPROFILE%\.CocosCreator\extensions
# macOS：$HOME/.CocosCreator/extensions

<!-- 
真正设计的 CLI 工具可能需要考虑以下一些功能：

帮助信息：用于打印支持的命令、选项参数等
版本信息：用于告知使用者当前的 CLI 版本
环境检测：用于检测当前支持的解释器（Node）版本等
交互面板：提供当前命令的可选项
信息打印：提供各种语义颜色的打印信息
...

因此你可能需要一些额外功能的依赖库，例如：

commander.js - node.js command-line interfaces made easy
chalk - Terminal string styling done right
Inquirer - A collection of common interactive command line user interfaces
node-semver - The semver parser for node (the one npm uses)
...

设计 CLI 工具的真正强大之处在于可使用 Node 支持的一切能力（例如常用的文件系统、http 服务等），从而使得开发者有各种可发挥的空间：

例如一键生成脚手架项目
  * 脚手架项目有了，但是版本不全
例如一键生成 / 更改源码文件
  * 一键生成有了，但没有改源码
例如配套各种提供开放 API 的管理平台（例如 Mock、I18N、主题包管理等）实现本地项目和平台之间的信息同步能力（比如通过网络配置，通过平台同步，生成套件和魔改模板等等）
  * 现阶段要做的：
    通过账号生成 Github 项目

例如一键生成 Webpack / Babel / Git Hook 等配置文件信息
  * 生成这些配置文件需要继续调研考察
...
-->
