const path = require('path')

/**
 * 获取 Cocos2.x 安装路径
 * @returns [string] path
 */
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

module.exports = {
    getCocosPath
}