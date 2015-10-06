'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _commonButtonBackToTop = require('../../common/button/back-to-top');

var _commonButtonBackToTop2 = _interopRequireDefault(_commonButtonBackToTop);

var _stickyMenu = require('./sticky-menu');

var _stickyMenu2 = _interopRequireDefault(_stickyMenu);

var _behavioursScroll = require('../../behaviours/scroll');

var _behavioursScroll2 = _interopRequireDefault(_behavioursScroll);

var _lodashCollection = require('lodash/collection');

var _lodashFunction = require('lodash/function');

var _lodashArray = require('lodash/array');

var _commonGrid = require('../../common/grid');

var _commonGrid2 = _interopRequireDefault(_commonGrid);

var _commonColumn = require('../../common/column');

var _commonColumn2 = _interopRequireDefault(_commonColumn);

var BackToTopComponent = _commonButtonBackToTop2['default'].component;
var debounceDelay = 50;

// component default props.
var defaultProps = {
    hasMenu: true, //Activate the presence of the sticky navigation component.
    hasBackToTop: true, //Activate the presence of BackToTop button
    offset: 80, //offset position when affix
    gridMenuSize: 3, //default grid size of the menu
    gridContentSize: 9 //default content size of the menu
};

// component props definition.
var propTypes = {
    hasMenu: _react.PropTypes.bool,
    hasBackToTop: _react.PropTypes.bool,
    offset: _react.PropTypes.number,
    gridMenuSize: _react.PropTypes.number,
    gridContentSize: _react.PropTypes.number
};

/**
* ScrollspyContainer component.
*/

var ScrollspyContainer = (function (_Component) {
    _inherits(ScrollspyContainer, _Component);

    function ScrollspyContainer(props) {
        var _this = this;

        _classCallCheck(this, _ScrollspyContainer);

        _Component.call(this, props);

        this.componentDidMount = function () {
            _this._scrollCarrier = window;
            _this._scrollCarrier.addEventListener('scroll', _lodashFunction.debounce(_this._refreshMenu, debounceDelay));
            _this._scrollCarrier.addEventListener('resize', _lodashFunction.debounce(_this._refreshMenu, debounceDelay));
            _this._executeRefreshMenu(10);
        };

        this.componentWillUnMount = function () {
            _this._scrollCarrier.removeEventListener('scroll', _lodashFunction.debounce(_this._refreshMenu, debounceDelay));
            _this._scrollCarrier.removeEventListener('resize', _lodashFunction.debounce(_this._refreshMenu, debounceDelay));
        };

        this._executeRefreshMenu = function (time) {
            //TODO : to rewrite becuase of memory leak
            for (var i = 0; i < time; i++) {
                setTimeout(function () {
                    _this._refreshMenu();
                }, i * 1000);
            }
        };

        this._refreshMenu = function () {
            if (!_this.props.hasMenu) {
                return;
            }
            _this.setState({
                menuList: _this._buildMenuList(), //build the menu list
                affix: _this._isMenuAffix() //Calculate menu position (affix or not)
            });
        };

        this._buildMenuList = function () {
            var hasMenu = _this.props.hasMenu;

            if (!hasMenu) {
                return [];
            }
            var currentScrollPosition = _this.scrollPosition();

            //get menu list
            var selectionList = document.querySelectorAll('[data-spy]');
            if (selectionList.length === 0) {
                return;
            }
            var menuList = [].map.call(selectionList, function (selection, index) {
                var title = selection.querySelector('[data-spy-title]');
                var nodeId = selection.getAttribute('data-spy');
                return {
                    index: index,
                    label: title.innerHTML,
                    nodeId: nodeId,
                    offsetTop: selection.offsetTop, // offset of 10 to ensure
                    isActive: false,
                    onClick: _this._handleMenuItemClick(nodeId)
                };
            });

            var nextTitles = _lodashCollection.filter(menuList, function (n) {
                return currentScrollPosition.top < _this._getElementRealPosition(n.offsetTop);
            });

            //Calculate current node
            //by default, first node is indexed
            var currentIndex = menuList[0].index;
            if (0 < nextTitles.length) {
                //check the first node
                var firstNode = _lodashArray.first(nextTitles);
                var index = firstNode.index;
                if (0 < index) {
                    currentIndex = menuList[index - 1].index;
                }
            } else {
                //means that the position is the last title
                currentIndex = _lodashArray.last(menuList).index;
            }
            menuList[currentIndex].isActive = true;
            return menuList;
        };

        this._getElementRealPosition = function (position) {
            var offset = _this.props.offset;

            return position - offset - 10;
        };

        this._isMenuAffix = function () {
            var _props = _this.props;
            var hasMenu = _props.hasMenu;
            var offset = _props.offset;

            if (!hasMenu) {
                return false;
            }
            var currentScrollPosition = _this.scrollPosition();
            var menu = _reactDom2['default'].findDOMNode(_this.refs.stickyMenu);
            var menuTopPosition = menu.offsetTop;
            return menuTopPosition < currentScrollPosition.top + offset;
        };

        var state = {
            menuList: [],
            affix: false
        };
        this.state = state;
    }

    //Static props.

    /** @inheritDoc */

    /**
    * Handle click on item menu function.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    * @return {function}        function to call
    */

    ScrollspyContainer.prototype._handleMenuItemClick = function _handleMenuItemClick(menuId) {
        var _this2 = this;

        return function () {
            _this2._onMenuItemClick(menuId);
        };
    };

    /**
    * Menu click function. Scroll to the node position.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    */

    ScrollspyContainer.prototype._onMenuItemClick = function _onMenuItemClick(menuId) {
        var selector = '[data-spy=\'' + menuId + '\']';
        var node = document.querySelector(selector);
        var positionTop = this._getElementRealPosition(node.offsetTop);
        this.scrollTo(undefined, positionTop);
    };

    /** @inheritedDoc */

    ScrollspyContainer.prototype.render = function render() {
        var _props2 = this.props;
        var children = _props2.children;
        var gridMenuSize = _props2.gridMenuSize;
        var hasMenu = _props2.hasMenu;
        var hasBackToTop = _props2.hasBackToTop;
        var offset = _props2.offset;

        var otherProps = _objectWithoutProperties(_props2, ['children', 'gridMenuSize', 'hasMenu', 'hasBackToTop', 'offset']);

        var _state = this.state;
        var affix = _state.affix;
        var menuList = _state.menuList;
        var gridContentSize = this.props.gridContentSize;

        gridContentSize = hasMenu ? gridContentSize : 12;
        return _react2['default'].createElement(
            _commonGrid2['default'],
            _extends({ 'data-focus': 'scrollspy-container' }, otherProps),
            hasMenu && _react2['default'].createElement(
                _commonColumn2['default'],
                { size: gridMenuSize },
                _react2['default'].createElement(_stickyMenu2['default'], { affix: affix, affixOffset: offset, menuList: menuList, ref: 'stickyMenu' })
            ),
            _react2['default'].createElement(
                _commonColumn2['default'],
                { 'data-focus': 'scrollspy-container-content', size: gridContentSize },
                children
            ),
            hasBackToTop && _react2['default'].createElement(BackToTopComponent, null)
        );
    };

    var _ScrollspyContainer = ScrollspyContainer;
    ScrollspyContainer = _behavioursScroll2['default'](ScrollspyContainer) || ScrollspyContainer;
    return ScrollspyContainer;
})(_react.Component);

ScrollspyContainer.displayName = 'ScrollspyContainer';
ScrollspyContainer.defaultProps = defaultProps;
ScrollspyContainer.propTypes = propTypes;

exports['default'] = ScrollspyContainer;
module.exports = exports['default'];

/** @inheritDoc */

/**
* Refresh screen X times.
* @param  {number} time number of execution
*/

/**
* The scroll event handler
* @private
*/

/**
* Build the list of menus.
* @private
* @return {array} the list of menus.
*/

/**
* Calculate the real position of an element, depending on declared offset in props.
* @private
* @param  {number} position position
* @return {number} the real position
*/

/**
* Calculate menu position (affix or not)
* @private
* @return {Boolean} true is menu must be affix, else false
*/