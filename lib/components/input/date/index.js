// Dependencies

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _behavioursComponentBase = require('../../../behaviours/component-base');

var _behavioursComponentBase2 = _interopRequireDefault(_behavioursComponentBase);

var _defaultLocale = require('./default-locale');

var _defaultLocale2 = _interopRequireDefault(_defaultLocale);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _lodashFunction = require('lodash/function');

var isDateStringValid = _lodashFunction.compose(function (bool) {
    return !bool;
}, isNaN, Date.parse);

var propTypes = {
    drops: _react.PropTypes.oneOf(['up', 'down']).isRequired,
    error: _react.PropTypes.string,
    locale: _react.PropTypes.object.isRequired,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    placeHolder: _react.PropTypes.string.isRequired,
    showDropdowns: _react.PropTypes.bool.isRequired,
    validate: _react.PropTypes.func,
    value: function value(props, propName, componentName) {
        var prop = props[propName];
        if (prop && !isDateStringValid(prop)) {
            throw new Error('The date (' + prop + ') is invalid for component ' + componentName + '. Please provide a valid date string.');
        }
    }
};

var defaultProps = {
    drops: 'down',
    locale: _defaultLocale2['default'],
    /**
    * Default onChange prop, that will log an error.
    */
    onChange: function onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },
    showDropdowns: true,
    validate: isDateStringValid,
    value: _moment2['default']()
};

var InputDate = (function (_Component) {
    _inherits(InputDate, _Component);

    function InputDate(props) {
        var _this = this;

        _classCallCheck(this, _InputDate);

        _Component.call(this, props);

        this.componentWillMount = function () {
            _moment2['default'].locale('focus', _this.props.locale);
            document.addEventListener('click', _this._onDocumentClick);
        };

        this.componentDidMount = function () {
            var _props = _this.props;
            var drops = _props.drops;
            var showDropdowns = _props.showDropdowns;
            var startDate = _this.state.inputDate;
        };

        this.componentWillReceiveProps = function (_ref) {
            var value = _ref.value;

            _this.setState({
                dropDownDate: isDateStringValid(value) ? _moment2['default'](Date.parse(value)) : _moment2['default'](),
                inputDate: _this._formatDate(value)
            });
        };

        this.componentWillUnmount = function () {
            document.removeEventListener('click', _this._onDocumentClick);
        };

        this.isDateStringValid = function (value) {
            var locale = arguments.length <= 1 || arguments[1] === undefined ? _this.props.locale : arguments[1];
            return _moment2['default'](value, locale.longDateFormat[locale.format]).isValid();
        };

        this.getValue = function () {
            var inputDate = _this.state.inputDate;
            var locale = _this.props.locale;

            var format = locale.longDateFormat[locale.format];
            return _this.isDateStringValid(inputDate) ? _moment2['default'](inputDate, format).toISOString() : null;
        };

        this._formatDate = function (isoDate) {
            var locale = _this.props.locale;

            var format = locale.longDateFormat[locale.format];
            if (isDateStringValid(isoDate)) {
                return _moment2['default'](isoDate).format(format);
            } else {
                return isoDate;
            }
        };

        this._onInputChange = function (inputDate) {
            if (_this.isDateStringValid(inputDate)) {
                var locale = _this.props.locale;

                var format = locale.longDateFormat[locale.format];
                var dropDownDate = _moment2['default'](inputDate, format);
                _this.setState({ dropDownDate: dropDownDate, inputDate: inputDate });
            } else {
                _this.setState({ inputDate: inputDate });
            }
        };

        this._onInputBlur = function () {
            var inputDate = _this.state.inputDate;
            var locale = _this.props.locale;

            var format = locale.longDateFormat[locale.format];
            if (_this.isDateStringValid(inputDate)) {
                _this.props.onChange(_moment2['default'](inputDate, format).toISOString());
            } else {
                _this.props.onChange(inputDate);
            }
        };

        this._onDropDownChange = function (text, date) {
            if (date._isValid) {
                _this.setState({ displayPicker: false }, function () {
                    _this._onInputChange(_this._formatDate(date.toISOString())); // Add 12 hours to avoid skipping a day due to different locales
                });
            }
        };

        this._onInputFocus = function () {
            _this.setState({ displayPicker: true });
        };

        this._onDocumentClick = function (_ref2) {
            var target = _ref2.target;

            var dataset = target ? target.dataset : null;
            var reactid = dataset ? dataset.reactid : null;

            var _map = ['picker', 'input'].map(function (ref) {
                return _reactDom2['default'].findDOMNode(_this.refs[ref]);
            });

            var picker = _map[0];
            var input = _map[1];

            var pickerId = picker ? picker.dataset.reactid : null;
            var inputId = input ? input.dataset.reactid : null;
            if (reactid && pickerId && inputId && !reactid.startsWith(pickerId) && !reactid.startsWith(inputId)) {
                _this.setState({ displayPicker: false });
            }
        };

        this.validate = function (inputDate) {
            var isValid = undefined;
            if (inputDate) {
                isValid = '' === inputDate ? true : isDateStringValid(inputDate);
            } else {
                isValid = '' === _this.state.inputDate ? true : _this.isDateStringValid(_this.state.inputDate);
            }
            return {
                isValid: isValid,
                message: isValid ? '' : inputDate + ' is not a valid date.'
            };
        };

        var value = props.value;

        var state = {
            dropDownDate: isDateStringValid(value) ? _moment2['default'](Date.parse(value)) : _moment2['default'](),
            inputDate: this._formatDate(value, props.locale),
            displayPicker: false
        };
        this.state = state;
    }

    InputDate.prototype.render = function render() {
        var _props2 = this.props;
        var error = _props2.error;
        var name = _props2.name;
        var placeHolder = _props2.placeHolder;
        var _state = this.state;
        var dropDownDate = _state.dropDownDate;
        var inputDate = _state.inputDate;
        var displayPicker = _state.displayPicker;
        var _onInputBlur = this._onInputBlur;
        var _onInputChange = this._onInputChange;
        var _onInputFocus = this._onInputFocus;
        var _onDropDownChange = this._onDropDownChange;
        var _onPickerCloserClick = this._onPickerCloserClick;

        return React.createElement(
            'div',
            { 'data-focus': 'input-date' },
            React.createElement(_text2['default'], { error: error, name: name, onBlur: _onInputBlur, onChange: _onInputChange, onFocus: _onInputFocus, placeHolder: placeHolder, ref: 'input', value: inputDate }),
            displayPicker && React.createElement(
                'div',
                { 'data-focus': 'picker-zone' },
                React.createElement(_reactDatePicker2['default'], {
                    date: dropDownDate,
                    hideFooter: true,
                    locale: 'focus',
                    onChange: _onDropDownChange,
                    ref: 'picker'
                })
            )
        );
    };

    var _InputDate = InputDate;
    InputDate = _behavioursComponentBase2['default'](InputDate) || InputDate;
    return InputDate;
})(_react.Component);

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;
InputDate.displayName = 'InputDate';

exports['default'] = InputDate;
module.exports = exports['default'];