// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var types = require('focus-core').component.types;
/**
 * Grid component.
 */

var Grid = (function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        _Component.call(this, props);
    }

    /** @inheriteDoc */

    Grid.prototype.render = function render() {
        var _props = this.props;
        var children = _props.children;

        var otherProps = _objectWithoutProperties(_props, ['children']);

        return React.createElement(
            'div',
            _extends({ className: 'mdl-grid' }, otherProps),
            children
        );
    };

    return Grid;
})(Component);

Grid.propTypes = {
    children: types('element')
};

//Static props.
Grid.displayName = 'Grid';
module.exports = Grid;