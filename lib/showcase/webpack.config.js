'use strict';

var focusShowcaseConf = require('./focus-showcase.webpack');
var devConfBuilder = require('webpack-focus').devConfig;
module.exports = devConfBuilder(focusShowcaseConf);