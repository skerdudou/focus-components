'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// component default props.
var defaultProps = {
    affix: false,
    affixOffset: 100,
    menuList: []
};

// component props definition.
var propTypes = {
    affix: _react.PropTypes.bool,
    affixOffset: _react.PropTypes.number,
    menuList: _react.PropTypes.array
};

/**
* Sticky menu component.
*/

var StickyMenu = (function (_Component) {
    _inherits(StickyMenu, _Component);

    function StickyMenu() {
        _classCallCheck(this, StickyMenu);

        _Component.apply(this, arguments);
    }

    //Static props.

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */

    StickyMenu.prototype.render = function render() {
        var _props = this.props;
        var affix = _props.affix;
        var affixOffset = _props.affixOffset;
        var menuList = _props.menuList;

        var otherProps = _objectWithoutProperties(_props, ['affix', 'affixOffset', 'menuList']);

        return _react2['default'].createElement(
            'nav',
            _extends({ 'data-affix': affix, 'data-focus': 'sticky-menu', style: affix ? { position: 'fixed', top: affixOffset + 'px' } : null }, otherProps),
            _react2['default'].createElement(
                'ul',
                null,
                menuList.map(function (menu) {
                    var label = menu.label;
                    var nodeId = menu.nodeId;
                    var isActive = menu.isActive;
                    var onClick = menu.onClick;

                    return _react2['default'].createElement(
                        'li',
                        { 'data-active': isActive, key: nodeId, onClick: onClick },
                        label
                    );
                })
            )
        );
    };

    return StickyMenu;
})(_react.Component);

StickyMenu.displayName = 'StickyMenu';
StickyMenu.defaultProps = defaultProps;
StickyMenu.propTypes = propTypes;

exports['default'] = StickyMenu;
module.exports = exports['default'];