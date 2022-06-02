/* eslint-disable no-undef */
const main = require("./static/node/js/main").default;


/**
 * 辅助刷新的代码
 */
const fs = require("fs");
const path = require("path");
const watchFilePath = path.resolve(__dirname, "sum.json");
if (fs.existsSync(watchFilePath)) {
  const watch = fs.watch(watchFilePath);
  const _load = main.load;
  main.load = function (...args) {
    _load && _load.call(main, ...args);
    watch.once("change", () => {
      Editor.clearLog()
      Editor.Package.reload(__dirname);
    });
  }

  const _unload = main.unload;
  main.unload = function (...args) {
    _unload && _unload.call(main, ...args);
    watch.close();
  }
}



/**
 * 辅助刷新的代码 —————— end
 */



module.exports = Object.assign({}, main);