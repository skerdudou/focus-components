'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashLang = require('lodash/lang');

var Scroll = function Scroll(Component) {
    return (function (_Component) {
        _inherits(ScrollComponent, _Component);

        function ScrollComponent(props) {
            _classCallCheck(this, ScrollComponent);

            _Component.call(this, props);
        }

        /**
        * Get the scroll position from the top of the screen.
        * @param {object} node
        * @returns {int} - The position in pixel from the top of the scroll container.
        */

        ScrollComponent.prototype.scrollPosition = function scrollPosition(domNode) {
            if (_lodashLang.isUndefined(domNode)) {
                var y = window.pageYOffset || document.documentElement.scrollTop;
                var x = window.pageXOffset || document.documentElement.scrollLeft;
                return { top: y, left: x };
            }
            return { top: domNode.scrollTop, left: domNode.scrollLeft };
        };

        /**
        * Set scrollbar position with smooth animation.
        * http://www.w3schools.com/jsref/prop_win_pagexoffset.asp
        *
        * @param {object} element  element parent for the scroll
        * @param {number} to       position of the scroll
        * @param {number} duration duration of animation
        */

        ScrollComponent.prototype.scrollTo = function scrollTo(element, to) {
            var duration = arguments.length <= 2 || arguments[2] === undefined ? 500 : arguments[2];

            if (_lodashLang.isUndefined(element)) {
                window.scrollTo(0, to);
                return;
            }
            element.scrollTop = to;
        };

        return ScrollComponent;
    })(Component);
};

exports['default'] = Scroll;
module.exports = exports['default'];