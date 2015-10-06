'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('material-design-lite/material');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18nextClient = require('i18next-client');

var _i18nextClient2 = _interopRequireDefault(_i18nextClient);

//Import focus components

require('../style');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _focusCore = require('focus-core');

var _focusCore2 = _interopRequireDefault(_focusCore);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

require('./style/template.scss');

require('./style/demo.scss');

require('./service/create-index');

require('highlight.js/styles/default.css');

// exposing in windows

//Import the router

require('./router');

window.jQuery = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
window.React = _react2['default'];
window.ReactDOM = _reactDom2['default'];
window.Focus = _focusCore2['default'];
window.FocusComponents = _2['default'];
window.moment = _moment2['default'];
window.i18n = _i18nextClient2['default'];
document.addEventListener('DOMContentLoaded', function () {
    jQuery(document).on('click', 'a:not([data-bypass])', function touchHandler(evt) {
        var href = { prop: jQuery(this).prop('href'), attr: jQuery(this).attr('href') };
        var root = location.protocol + '//' + location.host + '/';

        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    //Init index
    // Render the showcase
    _i18nextClient2['default'].init({ resStore: _resources2['default'], lng: 'dev' }, function () {
        console.log('Translation correctlyzzz.');
        Backbone.history.start();
    });
});