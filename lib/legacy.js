'use strict';

var _lodashLang = require('lodash/lang');

var _componentsInputCheckbox = require('./components/input/checkbox');

var _componentsInputToggle = require('./components/input/toggle');

var _componentsInputSelect = require('./components/input/select');

var _componentsScrollspyContainer = require('./components/scrollspy-container');

var _componentsPanel = require('./components/panel');

var legacy = {
    common: {
        input: {
            text: { component: InputText, mixin: InputText },
            checkbox: { component: _componentsInputCheckbox.InputCheckbox, mixin: _componentsInputCheckbox.InputCheckbox },
            toggle: { component: _componentsInputToggle.InputToggle, mixin: _componentsInputToggle.InputToggle }
        },
        select: {
            classic: { component: _componentsInputSelect.Select, mixin: _componentsInputSelect.Select }
        },
        detail: { component: _componentsScrollspyContainer.ScrollspyContainer },
        block: { component: _componentsPanel.Panel }
    }
};