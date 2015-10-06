'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _catalogComponentsJson = require('../catalog/components.json');

var _catalogComponentsJson2 = _interopRequireDefault(_catalogComponentsJson);

//Reduce the tags list.
exports['default'] = _catalogComponentsJson2['default'].reduce(function (prev, current, idx, arr) {
    var keywords = current.keywords;

    if (keywords) {
        keywords.map(function (keyword) {
            if (prev.indexOf(keyword) === -1) {
                prev.push(keyword);
            }
        });
    }
    return prev;
}, []).sort();
module.exports = exports['default'];