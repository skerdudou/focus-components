//Dependencies.
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require$component = require('focus-core').component;

var builder = _require$component.builder;
var types = _require$component.types;

var React = require('react');
var ReactDOM = require('react-dom');
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var union = require('lodash/array/union');

var _require = require('lodash/lang');

var isUndefined = _require.isUndefined;
var isNull = _require.isNull;
var isNumber = _require.isNumber;

var UNSELECTED_KEY = 'UNSELECTED_KEY';

/**
* Input text mixin.
* @type {Object}
*/
var selectMixin = {
    /** @inheritdoc */
    displayName: 'Select',
    /** @inheritdoc */
    mixins: [i18nMixin, stylableMixin],
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            labelKey: 'label',
            multiple: false,
            values: [],
            valueKey: 'code',
            hasUndefined: true,
            disabled: false
        };
    },
    /** @inheritdoc */
    propTypes: {
        multiple: types('bool'),
        labelKey: types('string'),
        name: types('string'),
        isRequired: types('bool'),
        onChange: types('function'),
        value: types(['number', 'string', 'array']),
        values: types('array'),
        valueKey: types('string'),
        disabled: types('bool')
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.input.Select');
    },
    /** @inheritdoc */
    getInitialState: function getInitialState() {
        var _props = this.props;
        var hasUndefined = _props.hasUndefined;
        var value = _props.value;
        var values = _props.values;
        var valueKey = _props.valueKey;
        var isRequired = _props.isRequired;

        var hasValue = !isUndefined(value) && !isNull(value);
        var isRequiredAndHasValue = true === isRequired && hasValue;
        return {
            value: value,
            hasUndefined: false === hasUndefined || isRequiredAndHasValue ? false : true, //!value
            isNumber: values && 0 < values.length && values[0] && values[0][valueKey] && isNumber(values[0][valueKey])
        };
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    },
    /**
    * Get the value of the component.
    * @return {object} - Return the value of the component.
    */
    getValue: function getValue() {
        var select = this.refs.select;

        var domValue = ReactDOM.findDOMNode(select).value;
        if (domValue === UNSELECTED_KEY) {
            return null;
        }
        return this.state.isNumber ? +domValue : domValue;
    },
    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleOnChange: function _handleOnChange(event) {
        //On change handler.
        var _props2 = this.props;
        var onChange = _props2.onChange;
        var multiple = _props2.multiple;

        if (onChange) {
            onChange(event);
        } else {
            var domValue = event.target.value;
            var value = this.state.isNumber ? +domValue : domValue;
            //Set the state then call the change handler.
            if (multiple) {
                var vals = this.state.value;
                vals.push(value);
                return this.setState({ value: vals });
            }
            return this.setState({ value: value });
        }
    },
    /** @inheritdoc */
    renderOptions: function renderOptions() {
        var _this = this;

        var processValues = undefined;
        var _props3 = this.props;
        var labelKey = _props3.labelKey;
        var valueKey = _props3.valueKey;
        var values = _props3.values;
        var hasUndefined = this.state.hasUndefined;

        if (hasUndefined) {
            var _ref;

            processValues = union([(_ref = {}, _ref[labelKey] = 'select.unSelected', _ref[valueKey] = UNSELECTED_KEY, _ref)], values);
        } else {
            processValues = values;
        }
        return processValues.map(function (val, idx) {
            var value = '' + val[valueKey];
            var label = val[labelKey] || 'select.noLabel';
            return React.createElement(
                'option',
                { key: idx, value: value },
                _this.i18n(label)
            );
        });
    },
    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render: function render() {
        var props = this.props;
        var state = this.state;
        var _getStyleClassName = this._getStyleClassName;
        var _handleOnChange = this._handleOnChange;
        var disabled = props.disabled;
        var error = props.error;
        var multiple = props.multiple;
        var name = props.name;
        var value = state.value;

        var disabledProps = disabled ? { disabled: 'disabled' } : {};
        var selectProps = _extends({ multiple: multiple, value: '' + value, name: name, onChange: _handleOnChange, className: _getStyleClassName(), ref: 'select' }, disabledProps);
        return React.createElement(
            'div',
            { 'data-focus': 'select', 'data-valid': !error },
            React.createElement(
                'select',
                selectProps,
                this.renderOptions()
            ),
            error && React.createElement(
                'div',
                { className: 'label-error', ref: 'error' },
                error
            )
        );
    }
};

module.exports = builder(selectMixin);