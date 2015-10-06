//Dependencies.
'use strict';

var _require$component = require('focus-core').component;

var builder = _require$component.builder;
var types = _require$component.types;

var React = require('react');
var i18nBehaviour = require('../../i18n/mixin');

/**
* Input text mixin.
* @type {Object}
*/
var displayTextMixin = {
    mixins: [i18nBehaviour],
    displayName: 'DisplayText',
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            formatter: function formatter(data) {
                return data;
            }
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: types('string'),
        value: types(['string', 'number']),
        name: types('string'),
        style: types('object')
    },
    /**
    * Render the value.
    * @return {string} The formated value.
    */
    renderValue: function renderValue() {
        var _props = this.props;
        var formatter = _props.formatter;
        var value = _props.value;

        var translatedValue = value ? this.i18n(value) : value;
        return formatter(translatedValue);
    },
    /** @inheritdoc */
    render: function renderInput() {
        return React.createElement(
            'div',
            this.props,
            this.renderValue()
        );
    }
};

module.exports = builder(displayTextMixin);