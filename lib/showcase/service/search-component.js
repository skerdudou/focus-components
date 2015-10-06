'use strict';

exports.__esModule = true;
exports['default'] = searchComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createIndex = require('./create-index');

var _createIndex2 = _interopRequireDefault(_createIndex);

var _catalogComponentsJson = require('../catalog/components.json');

var _catalogComponentsJson2 = _interopRequireDefault(_catalogComponentsJson);

function searchComponent(query) {
    if (query === null || query === undefined || query === '') {
        return _catalogComponentsJson2['default'];
    }
    var res = _createIndex2['default'].search(query);
    return res.map(function (comp) {
        return _catalogComponentsJson2['default'][comp.ref];
    });
}

module.exports = exports['default'];