(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.field = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var type = window.focus.component.types;
var React = window.React;
var valueBehaviour = require("./mixin/value-behaviour");
var validationBehaviour = require("./mixin/validation-behaviour");
var builtInComponents = require("./mixin/built-in-components");
var FieldMixin = {
  mixins: [valueBehaviour, validationBehaviour, builtInComponents],
  /**
  * Get field default properties.
  */
  getDefaultProps: function getFieldDefaultProps() {
    return {

      /**
       * Edition mode of the field.
       * @type {Boolean}
       */
      isEdit: true,
      /**
       * Size of the label in the grid system.
       * @type {Number}
       */
      labelSize: 3,
      /**
       * HTML input type.
       * @type {String}
       */
      type: "text",
      /**
       * Field name.
       * @type {string}
       */
      name: undefined,
      /**
       * Css properties of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    hasLabel: type("bool"),
    labelSize: type("number"),
    type: type("string"),
    name: type("string"),
    value: type(["string", "number"])
  },

  /** @inheritdoc */
  componentWillReceiveProps: function fieldWillReceiveProps(newProps) {
    this.setState({ value: newProps.value, values: newProps.values });
  },
  /**
  * Get the css class of the field component.
  */
  _className: function _className() {
    var stateClass = this.state.error ? "has-feedback has-error" : "";
    return "form-group " + stateClass;
  },

  render: function renderField() {
    return React.createElement(
      "div",
      { className: this._className() },
      this.label(),
      this.props.isEdit ? this.props.values ? this.select() : this.input() : this.display(),
      this.help(),
      this.error()
    );
  }
};
module.exports = builder(FieldMixin);

},{"./mixin/built-in-components":3,"./mixin/validation-behaviour":4,"./mixin/value-behaviour":5}],2:[function(require,module,exports){
//Dependencies.
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var displayTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      name: undefined,
      formatter: function formatter(data) {
        return data;
      },
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type("string"),
    value: type(["string", "number"]),
    name: type("string"),
    style: type("object")
  },
  renderValue: function renderValueDisplayText() {
    return this.props.formatter(this.props.value);
  },
  /**
   * Render a display field.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return React.createElement(
      "div",
      {
        id: this.props.name,
        name: this.props.name,
        className: this.props.style["class"]
      },
      this.renderValue()
    );
  }
};

module.exports = builder(displayTextMixin);

},{}],3:[function(require,module,exports){
"use strict";

var InputText = require("../../input/text").component;
var DisplayText = require("../../display/text").component;
var SelectClassic = require("../../select/classic").component;
var Label = require("../../label").component;

var fieldBuiltInComponentsMixin = {
  /** @inheriteDoc */
  getDefaultProps: function getDefaultPropsBuiltInComponents() {
    return {
      /**
       * Does the component has a Label.
       * @type {Boolean}
       */
      hasLabel: true,
      /**
       * Redefine complety the component.
       * @type {Object}
       */
      FieldComponent: undefined,
      /**
       * Redefine only the input and label component.
       * @type {Object}
       */
      InputLabelComponent: undefined,
      /**
       * Component for the input.
       * @type {Object}
       */
      InputComponent: InputText,
      /**
       * Component for the select.
       * @type {Object}
       */
      SelectComponent: SelectClassic,
      /**
       * Component for the display.
       * @type {Object}
       */
      DisplayComponent: DisplayText
    };
  },
  /**
   * Render the label part of the component.
   * @return {[type]} [description]
   */
  label: function fieldLabel() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return;
    }
    if (this.props.hasLabel) {
      var labelClassName = "control-label col-sm-" + this.props.labelSize;
      return React.createElement(Label, {
        style: { className: labelClassName },
        name: this.props.name,
        key: this.props.name
      });
    }
  },
  /**
   * Rendet the input part of the component.
   * @return {[type]} [description]
   */
  input: function renderInput() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return this.renderFieldComponent();
    }
    var inputClassName = "form-control col-sm-" + (12 - this.props.labelSize);
    return React.createElement(
      "div",
      { className: "input-group" },
      React.createElement(this.props.InputComponent, {
        style: { "class": inputClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.state.value,
        type: this.props.type,
        onChange: this.onInputChange,
        ref: "input"
      })
    );
  },
  /**
   * [select description]
   * @return {[type]} [description]
   */
  select: function renderSelect() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return this.renderFieldComponent();
    }
    var selectClassName = "form-control col-sm-" + (12 - this.props.labelSize);
    return React.createElement(
      "div",
      { className: "input-group" },
      React.createElement(this.props.SelectComponent, {
        style: { "class": selectClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.state.value,
        values: this.state.values,
        type: this.props.type,
        onChange: this.onInputChange,
        ref: "input"
      })
    );
  },
  /**
   * Render the display part of the component.
   * @return {object} - The display part of the compoennt if the mode is not edit.
   */
  display: function renderDisplay() {
    if (this.props.FieldComponent || this.props.InputLabelComponent) {
      return this.renderFieldComponent();
    }
    var selectClassName = "form-control col-sm-" + (12 - this.props.labelSize);
    return React.createElement(
      "div",
      { className: "input-group" },
      React.createElement(this.props.DisplayComponent, {
        style: { "class": selectClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.state.value,
        type: this.props.type,
        ref: "display",
        formatter: this.props.formatter
      })
    );
  },
  /**
   * Render the error part of the component.
   * @return {object} - The error part of the component.
   */
  error: function renderError() {
    if (this.state.error) {
      if (this.props.FieldComponent) {
        return;
      }
      return (
        /*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
        React.createElement(
          "span",
          { className: "help-block" },
          this.state.error
        )
      );
    }
  },
  /**
   * Render the help component.
   * @return {object} - The help part of the component.
   */
  help: function renderHelp() {
    if (this.props.help) {
      if (this.props.FieldComponent) {
        return;
      }
      return React.createElement(
        "span",
        { className: "help-block" },
        this.props.help
      );
    }
  },
  /**
   * Render the field component if it is overriden in the component definition.
   */
  renderFieldComponent: function renderFieldComponent() {
    var Component = this.props.FieldComponent || this.props.InputLabelComponent;
    return React.createElement(Component, {
      id: this.props.name,
      name: this.props.name,
      label: this.props.name,
      value: this.state.value,
      type: this.props.type,
      style: this.props.style.input,
      error: this.state.error,
      help: this.props.help,
      onChange: this.onInputChange,
      ref: "input"
    });
  }
};

module.exports = fieldBuiltInComponentsMixin;

},{"../../display/text":2,"../../input/text":7,"../../label":8,"../../select/classic":9}],4:[function(require,module,exports){
"use strict";

var validationMixin = {
  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      isRequired: false,
      validator: undefined
    };
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validateInput: function validateInputText() {
    var value = this.getValue();
    if (this.props.isRequired && (value === undefined || value === "")) {
      return "Le champ " + this.props.name + " est requis";
    }
    if (this.props.validator) {
      return this.props.validator(value);
    }
    return true;
  },
  /**
  * Validate the field.
  * @return {object} - undefined if valid, {name: "errors"} if not valid.
  */
  validate: function validateField() {
    var validationStatus = this.validateInput();
    if (validationStatus !== true) {
      this.setState({ error: validationStatus });
      return validationStatus;
    }
    return;
  }
};
module.exports = validationMixin;

},{}],5:[function(require,module,exports){
"use strict";

var valueBehaviourMixin = {
  /** @inheritdoc */
  getDefaultProps: function getDefaultValueBehaviourProps() {
    return {
      error: undefined,
      value: undefined
    };
  },
  /** @inheritdoc */
  getInitialState: function getFieldInitialState() {
    return {
      error: this.props.error,
      value: this.props.value
    };
  },
  /**
  * Get the value from the field.
  */
  getValue: function getValue() {
    return this.refs.input.getValue();
  },
  /**
   * Handler called when the input Change its value.
   * @param {event} event - The event to set.
   */
  onInputChange: function fieldOnInputChanges(event) {
    this.setState({ error: undefined, value: this.getValue() });
  }
};

module.exports = valueBehaviourMixin;

},{}],6:[function(require,module,exports){
/*global window*/
"use strict";

module.exports = {
    /**
     * Compute the translated label.
     * @param key {string}- Key in the dictionnary of translations.
     * @param data {object} - Data to interpole in the translated string.
     * @returns {string} - Translated string.
     */
    i18n: function translate(key, data) {
        var fn = window.i18n && window.i18n.t ? window.i18n.t : function defaulti18n(trKey) {
            return trKey;
        };
        return fn(key, data);
    }
};

},{}],7:[function(require,module,exports){
//Dependencies.
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: "text",
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type("string"),
    value: type(["string", "number"]),
    name: type("string"),
    style: type("object")
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateInputText() {
    return {
      value: this.props.value
    };
  },
  /**
   * Update the component.
   * @param {object} newProps - The new props to update.
   */
  componentWillReceiveProps: function inputWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getInputTextValue() {
    return this.getDOMNode().value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function inputOnChange(event) {
    //On change handler.
    if (this.props.onChange) {
      return this.props.onChange(event);
    } else {
      //Set the state then call the change handler.
      this.setState({ value: event.target.value });
    }
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return React.createElement("input", {
      id: this.props.name,
      name: this.props.name,
      value: this.state.value,
      type: this.props.type,
      className: this.props.style["class"],
      onChange: this._handleOnChange
    });
  }
};

module.exports = builder(inputTextMixin);

},{}],8:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
/**
 * Label mixin for form.
 * @type {Object}
 */
var labelMixin = {
  mixins: [require("../i18n/mixin")],
  getDefaultProps: function getDefaultProps() {
    return {
      name: undefined,
      key: undefined,
      style: { className: "" }
    };
  },
  render: function render() {
    return React.createElement(
      "label",
      { className: this.props.style.className, htmlFor: this.props.name },
      this.i18n(this.props.name)
    );
  }
};

module.exports = builder(labelMixin);

},{"../i18n/mixin":6}],9:[function(require,module,exports){
//Dependencies.
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      multiple: false,
      value: undefined,
      values: [],
      valueKey: "value",
      labelKey: "code",
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    multiple: type("bool"),
    value: type(["number", "string"]),
    values: type("array"),
    valueKey: type("string"),
    labelKey: type("string"),
    name: type("string"),
    style: type("object")
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateSelect() {
    return {
      value: this.props.value
    };
  },
  /** @inheritdoc */
  componentWillReceiveProps: function selectWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  },
  /**
   * Get the value from the select in the DOM.
   */
  getValue: function getSelectTextValue() {
    return this.getDOMNode().value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function selectOnChange(event) {
    //On change handler.
    if (this.props.onChange) {
      return this.props.onChange(event);
    } else {
      //Set the state then call the change handler.
      this.setState({ value: event.target.value });
    }
  },
  /**
   * Render options.
   */
  renderOptions: function renderOptions() {
    var _this = this;

    return this.props.values.map(function (val) {
      var value = val[_this.props.valueKey];
      return React.createElement(
        "option",
        { key: value, value: value },
        val[_this.props.labelKey]
      );
    });
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderSelect() {
    return React.createElement(
      "select",
      {
        multiple: this.props.multiple,
        value: this.state.value,
        onChange: this._handleOnChange },
      this.renderOptions()
    );
  }
};

module.exports = builder(inputTextMixin);

},{}]},{},[1])(1)
});