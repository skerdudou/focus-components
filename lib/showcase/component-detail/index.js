//dependencies
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _highlightJs = require('highlight.js');

var _highlightJs2 = _interopRequireDefault(_highlightJs);

var types = require('focus-core').component.types;
var liStyle = { flex: 1, minWidth: '20%', marginTop: '7px', marginRight: '7px' };

/**
 * Component describing a component.
 */

var ComponentDetail = (function (_Component) {
  _inherits(ComponentDetail, _Component);

  function ComponentDetail(props) {
    _classCallCheck(this, ComponentDetail);

    _Component.call(this, props);
  }

  //Static props.

  ComponentDetail.prototype.componentDidMount = function componentDidMount() {
    _highlightJs2['default'].highlightBlock(_reactDom2['default'].findDOMNode(this.refs.code));
  };

  /** @inheriteDoc */

  ComponentDetail.prototype.render = function render() {
    var _props = this.props;
    var name = _props.name;
    var description = _props.description;
    var example = _props.example;
    var photo = _props.photo;
    var keywords = _props.keywords;
    var version = _props.version;
    var code = _props.code;

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'h1',
        null,
        name
      ),
      _react2['default'].createElement(
        'h3',
        null,
        version
      ),
      _react2['default'].createElement(
        'button',
        {
          className: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored',
          onClick: function () {
            Backbone.history.navigate('component/' + name + '/detail', true);
          },
          style: { position: 'absolute', top: '100px', right: '50px', width: '100px', height: '100px' }
        },
        _react2['default'].createElement(
          'i',
          { className: 'material-icons' },
          'code'
        )
      ),
      _react2['default'].createElement(
        'section',
        { className: 'section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp' },
        _react2['default'].createElement(
          'div',
          { className: 'mdl-card mdl-cell mdl-cell--12-col' },
          _react2['default'].createElement(
            'div',
            { className: 'mdl-card__supporting-text' },
            _react2['default'].createElement(
              'h4',
              null,
              'Description'
            ),
            description
          ),
          _react2['default'].createElement(
            'div',
            { className: 'mdl-card__actions' },
            _react2['default'].createElement(
              'a',
              { href: '#', className: 'mdl-button' },
              'View the code'
            )
          )
        )
      ),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement(
        'section',
        { className: 'section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp' },
        _react2['default'].createElement(
          'header',
          { className: 'section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white' },
          _react2['default'].createElement(
            'i',
            { className: 'material-icons' },
            'play_circle_filled'
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone' },
          _react2['default'].createElement(
            'div',
            { className: 'mdl-card__supporting-text' },
            _react2['default'].createElement(
              'h4',
              null,
              'Tags'
            ),
            keywords.slice(0, 2).map(function (tag) {
              return _react2['default'].createElement(
                'button',
                { className: 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored', style: { margin: '10px' } },
                tag
              );
            })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'mdl-card__actions' },
            _react2['default'].createElement(
              'a',
              { href: '#', className: 'mdl-button' },
              'See all tags'
            )
          )
        )
      ),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement('br', null),
      _react2['default'].createElement(
        'section',
        { className: 'section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp' },
        _react2['default'].createElement(
          'div',
          { className: 'mdl-card mdl-cell mdl-cell--12-col' },
          _react2['default'].createElement(
            'div',
            { className: 'mdl-card__supporting-text' },
            _react2['default'].createElement(
              'h4',
              null,
              'Example code'
            ),
            _react2['default'].createElement(
              'pre',
              { ref: 'code' },
              _react2['default'].createElement(
                'code',
                { className: 'javascript' },
                code
              )
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'mdl-card__actions' },
            _react2['default'].createElement(
              'button',
              { onClick: function () {
                  Backbone.history.navigate('component/' + name + '/detail', true);
                }, className: 'mdl-button' },
              'Play with the code'
            )
          )
        )
      )
    );
  };

  return ComponentDetail;
})(_react.Component);

ComponentDetail.displayName = 'ComponentDetail';
ComponentDetail.defaultProps = {};
ComponentDetail.propTypes = {
  description: types('string'),
  example: types('string'),
  url: types('string'),
  keywords: types('string'),
  photo: types('string'),
  name: types('string')
};

module.exports = ComponentDetail;