'use strict';

exports.__esModule = true;
exports['default'] = searchService;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _searchComponent = require('./search-component');

var _searchComponent2 = _interopRequireDefault(_searchComponent);

function searchService(options) {
    return new Promise(function (success, failure) {
        try {
            var criteria = options.data.criteria;

            var res = _searchComponent2['default'](criteria && criteria.query || undefined);
            success(res);
        } catch (e) {

            failure(e);
        }
    }).then(function (dataList) {
        return { dataList: dataList, totalCount: dataList.length };
    });
}

module.exports = exports['default'];