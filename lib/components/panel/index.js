'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _behavioursTranslation = require('../../behaviours/translation');

var _behavioursTranslation2 = _interopRequireDefault(_behavioursTranslation);

var _lodashCollection = require('lodash/collection');

var _lodashUtility = require('lodash/utility');

var defaultProps = {
    actionsPosition: 'top'
};

var propTypes = {
    actions: _react.PropTypes.func,
    actionsPosition: _react.PropTypes.oneOf(['both', 'bottom', 'top']).isRequired,
    title: _react.PropTypes.string
};

/**
* Panel.
*/

var Panel = (function (_Component) {
    _inherits(Panel, _Component);

    function Panel(props) {
        _classCallCheck(this, _Panel);

        _Component.call(this, props);
        var state = {
            spyId: _lodashUtility.uniqueId('panel_')
        };
        this.state = state;
    }

    //Static props.

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */

    Panel.prototype.render = function render() {
        var _props = this.props;
        var actions = _props.actions;
        var actionsPosition = _props.actionsPosition;
        var children = _props.children;
        var title = _props.title;

        var otherProps = _objectWithoutProperties(_props, ['actions', 'actionsPosition', 'children', 'title']);

        var spyId = this.state.spyId;

        var shouldDisplayActionsTop = actions && _lodashCollection.includes(['both', 'top'], actionsPosition);
        var shouldDisplayActionsBottom = actions && _lodashCollection.includes(['both', 'bottom'], actionsPosition);
        return _react2['default'].createElement(
            'div',
            _extends({ className: 'mdl-card mdl-card--border mdl-shadow--4dp', 'data-spy': spyId, 'data-focus': 'panel' }, otherProps),
            _react2['default'].createElement(
                'div',
                { className: 'mdl-card__title mdl-card--border', 'data-focus': 'panel-title' },
                title && _react2['default'].createElement(
                    'h3',
                    { 'data-spy-title': true },
                    this.i18n(title)
                ),
                shouldDisplayActionsTop && _react2['default'].createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                )
            ),
            _react2['default'].createElement(
                'div',
                { className: 'mdl-card__supporting-text', 'data-focus': 'panel-content' },
                children
            ),
            shouldDisplayActionsBottom && _react2['default'].createElement(
                'div',
                { className: 'mdl-card__actions mdl-card--border', 'data-focus': 'panel-actions' },
                _react2['default'].createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                )
            )
        );
    };

    var _Panel = Panel;
    Panel = _behavioursTranslation2['default'](Panel) || Panel;
    return Panel;
})(_react.Component);

Panel.displayName = 'Panel';
Panel.defaultProps = defaultProps;
Panel.propTypes = propTypes;

exports['default'] = Panel;
module.exports = exports['default'];