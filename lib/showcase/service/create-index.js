'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _lunrLunr = require('lunr/lunr');

var _lunrLunr2 = _interopRequireDefault(_lunrLunr);

var _catalogComponentsJson = require('../catalog/components.json');

var _catalogComponentsJson2 = _interopRequireDefault(_catalogComponentsJson);

/*
    Fields
    name => boost 20
    version => Component's version
    description => component's description
    keywords => keywords //Boost 10
    (code) => Source code
    id => Array's position
 */
var searchIndex = _lunrLunr2['default'](function () {
    this.field('name', { boost: 10 });
    this.field('description');
    this.field('keywords', { boost: 5 });
    this.ref('id');
});

//Populate the index
_catalogComponentsJson2['default'].map(function (component, idx) {
    var keywords = component.keywords;

    var otherComponentProp = _objectWithoutProperties(component, ['keywords']);

    searchIndex.add(_extends({}, otherComponentProp, { keywords: keywords.concat(' '), id: idx }));
});

exports['default'] = searchIndex;
module.exports = exports['default'];