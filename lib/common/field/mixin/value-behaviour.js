'use strict';

var _require = require('lodash/lang');

var isObject = _require.isObject;
var isFunction = _require.isFunction;
var isUndefined = _require.isUndefined;

var EMPTY = '';
var valueBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            error: undefined,
            value: undefined
        };
    },
    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            error: this.props.error,
            value: this.props.value
        };
    },
    /**
    * Gte the value from the field, it will look into the refs for the value, then into the state and then into the props.
    * If the value is null or empty string the value will be changed to undefined.
    * @return {object} - The value of the field.
    */
    getValue: function getValue() {
        var value = undefined;
        if (isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)) {
            value = this.refs.input.getValue();
        } else if (this.state && this.state.value !== undefined) {
            value = this.state.value;
        } else if (this.props && this.props.value !== undefined) {
            value = this.props.value;
        }
        if (isUndefined(value) || EMPTY === value) {
            value = null;
        }
        return value;
    },
    /**
    * Handler called when the input Change its value.
    * @param {event} event - The event to set.
    * @deprecated
    */
    onInputChange: function onInputChange(newValue) {
        if (this.props.onChange) {
            console.warn('\n                FOCUS 0.7.0\n                The onChange props signature has changed, instead of providing the DOM event with an object event: {target: \'The new value\'},\n                the new value is directly passed to the onChange function \'The new Value\'.\n                Don\'t forget that in your code you have to change the way you read the new value and you have to update the state of the component with\n                this.setState({error: null, value: newValue});\n            ');
            return this.props.onChange(newValue);
        }
        this.setState({ error: null, value: newValue });
    }
};
module.exports = valueBehaviourMixin;