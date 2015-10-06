'use strict';

var path = require('path');
var serverBuilder = require('webpack-focus').server;
var focusShowcaseConf = require('./focus-showcase.webpack');
serverBuilder(focusShowcaseConf);