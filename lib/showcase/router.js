'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _catalog = require('./catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _liveComponent = require('./live-component');

var _liveComponent2 = _interopRequireDefault(_liveComponent);

var _storeComponents = require('./store/components');

var _storeComponents2 = _interopRequireDefault(_storeComponents);

var _serviceGetComponentFromName = require('./service/get-component-from-name');

var _serviceGetComponentFromName2 = _interopRequireDefault(_serviceGetComponentFromName);

var _componentDetail = require('./component-detail');

var _componentDetail2 = _interopRequireDefault(_componentDetail);

var _serviceGetTags = require('./service/get-tags');

var _serviceGetTags2 = _interopRequireDefault(_serviceGetTags);

console.log('TAGS', _serviceGetTags2['default']);
var links = _serviceGetTags2['default'].map(function (tag) {
    return { url: '#query/' + tag, content: tag };
});
var ShowCaseRouter = _backbone2['default'].Router.extend({
    routes: {
        '': 'showcase',
        'component/:name': 'component',
        'component/:name/detail': 'componentDetail',
        'query': 'showcase',
        'query/:query': 'query',
        '*notFound': 'showcase'
    },
    showcase: function showcase() {
        console.log('showcase');
        // render the showcase into the document
        return _reactDom2['default'].render(_react2['default'].createElement(
            _layout2['default'],
            { title: 'Component catalog', links: links },
            _react2['default'].createElement(_catalog2['default'], { store: _storeComponents2['default'], query: '' })
        ), document.querySelector('body'));
    },
    component: function component(name) {
        console.log('component', name);
        var component = _serviceGetComponentFromName2['default'](name);
        return _reactDom2['default'].render(_react2['default'].createElement(
            _layout2['default'],
            { title: 'component ' + name, links: links },
            _react2['default'].createElement(_componentDetail2['default'], component)
        ), document.querySelector('body'));
    },
    componentDetail: function componentDetail(name) {
        console.log('component detail', name);
        var component = _serviceGetComponentFromName2['default'](name);
        return _reactDom2['default'].render(_react2['default'].createElement(_liveComponent2['default'], { component: component }), document.querySelector('body'));
    },
    query: function query(_query) {
        console.log('query route', _query);
        return _reactDom2['default'].render(_react2['default'].createElement(
            _layout2['default'],
            { title: 'query ' + _query, links: links },
            _react2['default'].createElement(_catalog2['default'], { store: _storeComponents2['default'], query: _query })
        ), document.querySelector('body'));
    }
});
exports['default'] = new ShowCaseRouter();
module.exports = exports['default'];