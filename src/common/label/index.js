// Dependencies
import React, {PropTypes} from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import {translate} from 'focus-core/translation';

const styleBehaviour = require('../../mixin/stylable');

/**
* Label mixin for form.
* @type {Object}
*/
const labelMixin = {
    mixins: [styleBehaviour],

    /** @inheritdoc */
    propTypes: {
        name: PropTypes.string.isRequired,
        text: PropTypes.string
    },
    componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Label\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Label');
    },
    /** @inheritdoc */
    render() {
        const {name, text, style} = this.props;
        const content = text || name;
        return (
            <label className={style.className} data-focus="label" htmlFor={name}>
                {translate(content)}
            </label>
        );
    }
};

module.exports = builder(labelMixin);
