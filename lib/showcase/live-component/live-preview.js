/* globals babel */

// Dependencies
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _babelCoreBrowser = require('babel-core/browser');

var _babelCoreBrowser2 = _interopRequireDefault(_babelCoreBrowser);

var React = require('react');

var types = require('focus-core').component.types;

var LivePreview = React.createClass({
    displayName: 'LivePreview',
    propTypes: {
        code: types('string'),
        style: types('object')
    },
    /*style: {
        title: {
            margin: '15px',
            color: '#372B3F'
        },
        component: {
            padding: '5px'
        }
    },*/
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render: function render() {
        var _props = this.props;
        var code = _props.code;
        var mainStyle = _props.style;
        var style = this.style;

        var content = undefined;
        try {
            /* eslint-disable */
            content = eval(_babelCoreBrowser2['default'].transform('(function(){' + code + '})()', { stage: 0 }).code);
            /* eslint-enable */
        } catch (e) {
            content = e.toString();
        }

        return React.createElement(
            'div',
            null,
            content
        );
    }
});

module.exports = LivePreview;