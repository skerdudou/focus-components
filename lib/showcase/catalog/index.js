// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _serviceSearch = require('../service/search');

var _serviceSearch2 = _interopRequireDefault(_serviceSearch);

//Components

var _require = require('lodash/collection');

var reduce = _require.reduce;
var sortByOrder = _require.sortByOrder;
var find = _require.find;

var React = require('react');
var Component = React.Component;

var _require2 = require('../../page/list');

var ListPage = _require2.component;

var CatalogSearch = require('./catalog-search');
var CatalogList = require('./catalog-list');

var _require3 = require('../../application/popin');

var Popin = _require3.component;

/**
* Component describing a component.
*/

var ComponentCatalog = (function (_Component) {
    _inherits(ComponentCatalog, _Component);

    function ComponentCatalog(props) {
        _classCallCheck(this, ComponentCatalog);

        _Component.call(this, props);
    }

    // Static props

    ComponentCatalog.prototype._showLiveComponent = function _showLiveComponent() {
        var component = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        Backbone.history.navigate('component/' + component.name, true);
    };

    /** @inheriteDoc */

    ComponentCatalog.prototype.render = function render() {
        var _props = this.props;
        var store = _props.store;
        var query = _props.query;

        var props = _extends({}, this.props, { showLiveComponent: this._showLiveComponent.bind(this) });
        return React.createElement(
            'div',
            { 'data-focus': 'catalog' },
            React.createElement(CatalogSearch, { store: store, query: query }),
            React.createElement(ListPage, props)
        );
    };

    return ComponentCatalog;
})(Component);

ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    query: '',
    service: _serviceSearch2['default'],
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;