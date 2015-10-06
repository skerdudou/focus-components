'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _catalogComponentsJson = require('../catalog/components.json');

var _catalogComponentsJson2 = _interopRequireDefault(_catalogComponentsJson);

var _lodashCollection = require('lodash/collection');

exports['default'] = function (componentName) {
    return _lodashCollection.find(_catalogComponentsJson2['default'], function (comp) {
        return comp.name === componentName;
    });
};

module.exports = exports['default'];