// Dependencies
'use strict';

var React = require('react');

var types = require('focus-core').component.types;

var _require = require('lodash/function');

var debounce = _require.debounce;

// Components

var LiveEditor = require('./live-editor');
var LivePreview = require('./live-preview');

var LiveExample = React.createClass({
    displayName: 'LiveExample',
    propTypes: {
        component: types('object')
    },
    style: {
        name: {
            fontSize: '3em',
            marginLeft: '-5px',
            marginBottom: '0'
        },
        version: {
            fontSize: '1em',
            marginTop: '-18px',
            marginBottom: '0',
            color: 'grey'
        },
        keyword: {
            margin: '5px'
        },
        description: {
            fontSize: '1.2em',
            marginTop: '20px',
            marginBottom: '20px'
        },
        previewZone: {
            display: 'flex',
            width: '100%'
        },
        editor: {
            width: '50%',
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            zIndex: '10000',
            minHeight: '0'
        },
        preview: {
            flex: '1'
        }
    },
    /**
     * Get default props.
     * @return {object} Default props;
     */
    getDefaultProps: function getDefaultProps() {
        return {
            component: {}
        };
    },
    /**
     * Get initial state.
     * @return {Object} initial state
     */
    getInitialState: function getInitialState() {
        var codeText = this.props.component.code;

        return { codeText: codeText };
    },
    /**
     * Code change handler.
     * @param  {string} codeText the new code text
     */
    _handleCodeChange: function _handleCodeChange(codeText) {
        this.setState({ codeText: codeText });
    },
    /**
     * Render the component
     * @return {HTML} rendered component
     */
    render: function render() {
        var codeText = this.state.codeText;
        var _handleCodeChange = this._handleCodeChange;
        var style = this.style;
        var _props$component = this.props.component;
        var name = _props$component.name;
        var description = _props$component.description;
        var version = _props$component.version;
        var keywords = _props$component.keywords;

        return React.createElement(
            'div',
            null,
            React.createElement(LiveEditor, { code: codeText, name: name, onChange: debounce(_handleCodeChange, 100), style: style.editor, version: version }),
            React.createElement(LivePreview, { code: codeText })
        );
    }
});

module.exports = LiveExample;