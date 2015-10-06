'use strict';

exports.__esModule = true;
exports['default'] = _synchronousSearch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _catalogComponentsJson = require('../catalog/components.json');

var _catalogComponentsJson2 = _interopRequireDefault(_catalogComponentsJson);

var _lodashCollection = require('lodash/collection');

// Service

function _synchronousSearch(query) {
    if (!query) {
        return _catalogComponentsJson2['default'];
    }
    var matchQuery = _lodashCollection.reduce(_catalogComponentsJson2['default'], function (result, comp, index) {
        var name = comp.name;
        var description = comp.description;
        var keywords = comp.keywords;

        var count = 0;
        if (-1 !== name.indexOf(query)) {
            count++;
        }
        if (-1 !== description.indexOf(query)) {
            count++;
        }
        if (-1 !== keywords.indexOf(query)) {
            count++;
        }
        if (0 < count) {
            result[index] = { name: name, count: count, index: index };
        }
        return result;
    }, {});
    var sortedMatch = _lodashCollection.sortByOrder(matchQuery, ['count'], ['desc']);
    var sortedComponents = sortedMatch.map(function (comp) {
        return _catalogComponentsJson2['default'][comp.index];
    });
    //console.log('Match', matchQuery);
    //console.log('Sorted ', sortedComponents);
    return sortedComponents;
}

module.exports = exports['default'];