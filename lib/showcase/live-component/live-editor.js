// Dependencies
'use strict';

var React = require('react');

var types = require('focus-core').component.types;

require('brace');
require('brace/mode/jsx');
require('brace/theme/github');

// Components

var CodeEditor = require('react-ace');

var LiveEditor = React.createClass({
    displayName: 'LiveEditor',
    getInitialState: function getInitialState() {
        return { isVisible: true };
    },
    style: {
        title: {
            color: '#fff',
            height: 70,
            'background-color': 'rgb(33, 150, 243)'
        }
    },
    propTypes: {
        code: types('string'),
        onChange: types('func'),
        style: types('object')
    },
    _toggleVisible: function _toggleVisible() {
        this.setState({ isVisible: !this.state.isVisible });
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render: function render() {
        var _props = this.props;
        var code = _props.code;
        var name = _props.name;
        var onChange = _props.onChange;
        var mainStyle = _props.style;
        var version = _props.version;
        var isVisible = this.state.isVisible;
        var style = this.style;

        return React.createElement(
            'div',
            { className: 'demo-card-wide mdl-card mdl-shadow--2dp', style: mainStyle },
            React.createElement(
                'div',
                { className: 'mdl-card__title', style: style.title, onClick: this._toggleVisible },
                React.createElement(
                    'h2',
                    { className: 'mdl-card__title-text' },
                    'Component   ',
                    name,
                    '                                          v ',
                    version
                )
            ),
            isVisible && React.createElement(
                'div',
                { className: 'mdl-card__supporting-text', style: { width: '100%' } },
                React.createElement(CodeEditor, { editorProps: { $blockScrolling: 'Infinity' }, mode: 'jsx', name: 'codeEditor', onChange: onChange, theme: 'github', value: code, width: '100%' }),
                React.createElement(
                    'div',
                    { style: { fontSize: '1.8em', color: 'rgb(33, 150, 243)', marginTop: '15px' } },
                    'This code is live reloaded, feel free to play with it !'
                ),
                React.createElement(
                    'button',
                    { className: 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored', onClick: function () {
                            window.location.reload();
                        }, style: { position: 'fixed', right: '10px', bottom: '10px', backgroundColor: 'red' } },
                    React.createElement(
                        'i',
                        { className: 'material-icons', style: { color: 'white' } },
                        'sync_problem'
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'mdl-card__menu' },
                React.createElement(
                    'button',
                    { className: 'mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect', onClick: this._toggleVisible },
                    React.createElement(
                        'i',
                        { className: 'material-icons', style: { color: 'white' } },
                        'expand_' + (isVisible ? 'more' : 'less')
                    )
                )
            )
        );
    }
});

module.exports = LiveEditor;