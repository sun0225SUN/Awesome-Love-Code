const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const reactConfig = require('./webpack.react.config');
const lessConfig = require('./webpack.less.config');

const config = merge(baseConfig, reactConfig, lessConfig);

module.exports = config;
