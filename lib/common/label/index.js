// Dependencies

'use strict';

var _require$component = require('focus-core').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nBehaviour = require('../i18n/mixin');
var styleBehaviour = require('../../mixin/stylable');

/**
* Label mixin for form.
* @type {Object}
*/
var labelMixin = {
    mixins: [i18nBehaviour, styleBehaviour],
    /** @inheritdoc */
    propTypes: {
        name: types('string').isRequired,
        text: types('string')
    },
    /** @inheritdoc */
    render: function render() {
        var _props = this.props;
        var name = _props.name;
        var text = _props.text;
        var style = _props.style;

        var content = text || name;
        return React.createElement(
            'label',
            { className: style.className, 'data-focus': 'label', htmlFor: name },
            this.i18n(content)
        );
    }
};

module.exports = builder(labelMixin);