'use strict';

exports.__esModule = true;

var _focusCore = require('focus-core');

var ListStore = _focusCore.store.ListStore;
// Store wich contains all the query and the filtered elements
var listStore = new ListStore({ identifier: 'COMPONENT_CATALOG' });
exports['default'] = listStore;
module.exports = exports['default'];