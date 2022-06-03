/* eslint-disable no-undef */
const main = require("./static/node/js/scene").default;
delete require.cache[require.resolve("./static/node/js/scene")]
module.exports = Object.assign({}, main);