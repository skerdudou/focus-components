(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.form = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var builder = window.focus.component.builder;
var React = window.React;
var assign = require("object-assign");
var getEntityDefinition = window.focus.definition.entity.builder.getEntityInformations;
var builtInComponents = require("./mixin/built-in-components");
var referenceBehaviour = require("./mixin/reference-behaviour");
var storeBehaviour = require("./mixin/store-behaviour");
var actionBehaviour = require("./mixin/action-behaviour");

var isEmpty = require("lodash/lang/isEmpty");
/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [referenceBehaviour, storeBehaviour, actionBehaviour, builtInComponents],
  /** @inheritdoc */
  getDefaultProps: function getFormDefaultProps() {
    return {
      /**
       * Defines it the form can have  an edit mode.
       * @type {Boolean}
       */
      hasEdit: true,
      /**
       * Defines
       * @type {Boolean}
       */
      isEdit: false,
      /**
       * Style of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /** @inheritdoc */
  getInitialState: function getFormInitialState() {
    return {
      /**
       * Identifier of the entity.
       * @type {[type]}
       */
      id: this.props.id,
      isEdit: this.props.isEdit
    };
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function onFormStoreChangeHandler() {
    this.setState(this._getStateFromStores());
  },
  /** @inheritdoc */
  callMountedActions: function formCallMountedActions() {
    this._loadData();
    this._loadReference();
  },
  /** @inheritdoc */
  componentWillMount: function formWillMount() {
    this._buildDefinition();
    this._buildReference();
  },
  /** @inheritdoc */
  componentDidMount: function formDidMount() {
    //Build the definitions.
    this._registerListeners();
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  /** @inheritdoc */
  componentWillUnmount: function formWillMount() {
    this._unRegisterListeners();
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition() {
    if (!this.definitionPath) {
      throw new Error("the definition path should be defined to know the domain of your entity property.");
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @returns {boolean} - A boolean ttue if the
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      var validationRes = this.refs[inptKey].validate();
      if (validationRes !== undefined) {
        assign(validationMap, _defineProperty({}, inptKey, validationRes));
      }
    }
    if (isEmpty(validationMap)) {
      return true;
    }

    return false;
  },
  _editClass: function _editClass() {
    if (this.editClass) {
      return this.editClass();
    }
    return "form-" + (this.state.isEdit ? "edit" : "consult");
  },
  _className: function formClassName() {
    return "form-horizontal " + this.props.style.className + " " + this._editClass();
  },
  _renderActions: function renderActions() {
    if (this.renderActions) {
      return this.renderActions();
    }
    if (this.state.isEdit) {
      return this._renderEditActions();
    }
    return this._renderConsultActions();
  },
  _renderEditActions: function _renderEditActions() {
    if (this.renderEditActions) {
      return this.renderEditActions();
    }
    return React.createElement(
      "div",
      { className: "button-bar" },
      this.buttonCancel(),
      this.buttonSave()
    );
  },
  _renderConsultActions: function _renderConsultActions() {
    if (this.renderConsultActions) {
      return this.renderConsultActions();
    }
    return this.buttonEdit();
  },
  /**
   * Handle the form submission.
   * @param {Event} e - React sanityze event from the form submit.
   */
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    if (this.validate()) {
      this.action.save(this._getEntity());
    }
    //return false;
  },
  /** @inheritdoc */
  render: function renderForm() {
    return React.createElement(
      "form",
      {
        onSubmit: this._handleSubmitForm,
        className: this._className()
      },
      React.createElement(
        "fieldset",
        null,
        this.renderContent()
      )
    );
  }
};

module.exports = builder(formMixin);

},{"./mixin/action-behaviour":8,"./mixin/built-in-components":9,"./mixin/reference-behaviour":10,"./mixin/store-behaviour":11,"lodash/lang/isEmpty":32,"object-assign":42}],2:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
var Img = require("../../img").component;

/**/
var buttonMixin = {
	getDefaultProps: function getInputDefaultProps() {
		return {
			type: "submit",
			action: undefined,
			isPressed: false,
			style: {},
			label: undefined,
			imgSrc: undefined
		};
	},
	handleOnClick: function handleButtonOnclick() {
		if (this.props.handleOnClick) {
			return this.props.handleOnClick.apply(this, arguments);
		}
		if (!this.props.action || !this.action[this.props.action]) {
			console.warn("Your button action is not implemented");
			return;
		}
		return this.action[this.props.action].apply(this, arguments);
	},
	getInitialState: function getInitialState() {
		return {
			isPressed: this.props.isPressed
		};
	},
	_className: function buttonClassName() {
		return "btn btn-raised " + (this.props.style.className ? "btn-" + this.props.style.className : "");
	},
	renderPressedButton: function renderPressedButton() {
		return React.createElement(
			"button",
			null,
			"Loading..."
		);
	},
	/**
  * Render the button.
  * @return {[type]} [description]
  */
	render: function renderInput() {
		if (this.state.isPressed) {
			return this.renderPressedButton();
		}
		if (this.props.imgSrc) {
			return React.createElement(Img, { src: this.props.imgSrc, onClick: this.handleOnClick });
		}
		return React.createElement(
			"button",
			{ href: "javascript:void(0)", onClick: this.handleOnClick, type: this.props.type, className: this._className() },
			this.props.label
		);
	}
};

module.exports = builder(buttonMixin);

},{"../../img":13}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./mixin/built-in-components":5,"./mixin/validation-behaviour":6,"./mixin/value-behaviour":7}],5:[function(require,module,exports){
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

},{"../../display/text":3,"../../input/text":15,"../../label":16,"../../select/classic":19}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";

var assign = require("object-assign");
var actionMixin = {

  /**
     * Get the entity identifier for the form loading.
     * @returns {object} - The identifier of the entity.
     */
  _getId: function formGetId() {
    if (this.getId) {
      return this.getId();
    }
    return this.state.id;
  },
  /**
   * Get the constructed entity from the state.
   * @returns {object} - the entity informations.
   */
  _getEntity: function formGetEntity() {
    if (this.getEntity) {
      return this.getEntity();
    }
    //Build the entity value from the ref getVaue.
    var htmlData = {};
    for (var r in this.refs) {
      htmlData[r] = this.refs[r].getValue();
    }
    return assign({}, this.state, htmlData);
  },
  /**
   * Load data action call.
   */
  _loadData: function formLoadData() {
    this.action.load(this._getId());
  }
};

module.exports = actionMixin;

},{"object-assign":42}],9:[function(require,module,exports){
"use strict";

var React = window.React;
var Field = require("../../field").component;
var Button = require("../../button/action").component;
var List = require("../../list");
module.exports = {
  /**
   * Create a field for the given property metadata.
   * @param {string} name - property name.
   * @param {object} options - An object which contains all options for the built of the field.
   * @returns {object} - A React Field.
   */
  fieldFor: function fieldFor(name, options) {
    var def = this.definition && this.definition[name] ? this.definition[name] : {};
    options = options || {};
    var isEdit = options.isEdit !== undefined ? options.isEdit : this.state.isEdit;
    //Maybe allow to overrife fieldFor here such as def.fieldFor?.
    return React.createElement(Field, {
      name: "" + this.definitionPath + "." + name,
      ref: name,
      value: this.state[name],
      error: this.state.error ? this.state.error[name] : undefined,
      validator: def.validator,
      FieldComponent: def.FieldComponent,
      InputLabelComponent: def.InputLabelComponent,
      InputComponent: def.InputComponent,
      isEdit: isEdit,
      formatter: def.formatter
    });
  },
  /**
   * Select component for the component.
   * @param {string} name - property name.
   * @param {string} listName - list name.
   * @param {object} options - options object.
   * @returns {object} - A React Field.
   */
  selectFor: function selectFor(name, listName, options) {
    options = options || {};
    var def = this.definition && this.definition[name] ? this.definition[name] : {};
    listName = listName || def.listName;
    var isEdit = options.idEdit || true;
    //Check listName

    return React.createElement(Field, {
      name: name,
      ref: name,
      value: this.state[name],
      error: this.state.error ? this.state.error[name] : undefined,
      validator: def.validator,
      values: this.state.reference[listName], //Options to be rendered.
      FieldComponent: def.FieldComponent,
      InputLabelComponent: def.InputLabelComponent,
      isEdit: isEdit
    });
  },
  /**
   * Display a field.
   * @param {string} name - property name.
   * @param {object} options - options object.
   * @returns {object} - A React Field.
   */
  displayFor: function displayFor(name, options) {
    options = options || {};
    var def = this.definition && this.definition[name] ? this.definition[name] : {};
    var listName = options.listName || def.listName;
    return React.createElement(Field, {
      name: name,
      ref: name,
      value: this.state[name],
      values: this.state.reference ? this.state.reference[listName] : undefined, //Options to be rendered.
      FieldComponent: def.FieldComponent,
      InputLabelComponent: def.InputLabelComponent,
      isEdit: false
    });
  },
  /**
   * Display a list component.
   * @param {string} name - Property name.
   * @param {object} options - Options object.
   * @returns {object} - The react component for the line.
   */
  listFor: function listFor(name, options) {
    options = options || {};
    return React.createElement(List, {
      data: this.state[name],
      line: options.LineComponent || this.props.LineComponent || this.LineComponent,
      perPage: options.perPage || 5
    });
  },
  /**
   * Button delete generation.
   * @returns {object} - A Reacte button.
   */
  buttonDelete: function buttonDelete() {
    return React.createElement(Button, {
      label: "delete",
      type: "button",
      css: "delete"
    });
  },
  buttonEdit: function buttonEdit() {
    var form = this;
    return React.createElement(Button, {
      label: "edit",
      type: "button",
      css: "edit",
      handleOnClick: function handleOnClickEdit() {
        form.setState({ isEdit: !form.state.isEdit });
      }
    });
  },
  buttonCancel: function buttonCancel() {
    var form = this;
    return React.createElement(Button, {
      label: "cancel",
      type: "button",
      css: "cancel",
      handleOnClick: function handleOnClickCancel() {
        console.log("cancel");
        form.setState({ isEdit: !form.state.isEdit });
      }
    });
  },
  /**
   * Button save generation.
   * @returns {object} - A React button.
   */
  buttonSave: function buttonSave() {
    var form = this;

    return React.createElement(Button, {
      label: "save",
      type: "submit",
      css: "primary" });
  } };

/*handleOnClick: function(e){
  if(form.validate()){
    form.action.save(form._getEntity());
  }
  return;
}*/

},{"../../button/action":2,"../../field":4,"../../list":17}],10:[function(require,module,exports){
//focus.reference.builder.loadListByName('papas').then(function(data){focus.dispatcher.dispatch({action: {type: "update",data: {papas: data}}})})

"use strict";

var builtInRefStoreAccessor = window.focus.reference.builtInStore;
var builtInActionReferenceLoader = window.focus.reference.builtInAction;
var isEmpty = require("lodash/lang/isEmpty");
var referenceMixin = {
  /** @inheritdoc */
  /*  getDefaultProps: function getReferenceDefaultProps(){
      return {*/
  /**
   * Array which contains all the reference lists.
   * If the referenceNames are set into the object, they are set into the default props.
   * @type {Array}
   */
  /*  referenceNames: this.referenceNames || []
  };
  },*/
  getInitialState: function getInitialState() {
    return { reference: {} };
  },
  /**
   * Build actions associated to the reference.
   */
  _buildReferenceActions: function _buildReferenceActions() {
    this.action = this.action || {};
    this.action.loadReference = builtInActionReferenceLoader(this.referenceNames);
  },
  _loadReference: function _loadReference() {
    return this.action.loadReference();
  },
  /**
   * Build the reference names and set the store into the application.
   */
  _buildReferenceStoreConfig: function _buildReferenceStoreConfig() {
    //Get the store for references.
    var referenceStore = builtInRefStoreAccessor();

    //If the reference store is empty don't do anything.
    if (isEmpty(this.referenceNames)) {
      return;
    }
    this.stores = this.stores || [];
    //Set as referencestore the referencestore of the application.
    this.stores.push({
      store: referenceStore,
      properties: this.referenceNames
    });
  },
  /**
   * Build store and actions related to the reference.
   */
  _buildReference: function buildReference() {
    this._buildReferenceStoreConfig();
    this._buildReferenceActions();
  }
};

module.exports = referenceMixin;

},{"lodash/lang/isEmpty":32}],11:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var capitalize = require("lodash/string/capitalize");
var assign = require("object-assign");
var isArray = require("lodash/lang/isArray");

var storeMixin = {
  /**
   * Get the state informations from the store.
   * @returns {object} - The js object constructed from store data.
   */
  _getStateFromStores: function formGetStateFromStore() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    var newState = {};
    this.stores.map(function (storeConf) {
      storeConf.properties.map(function (property) {
        newState[property] = storeConf.store["get" + capitalize(property)]();
      });
    });
    return this._computeEntityFromStoresData(newState);
  },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   * @returns {object} - The js object transformed from store data.
   */
  _computeEntityFromStoresData: function _computeEntityFromStoresData(data) {
    if (this.computeEntityFromStoresData) {
      return this.computeEntityFromStoresData(data);
    }
    var entity = { reference: {} };
    for (var key in data) {
      if (this.referenceNames && this.referenceNames.indexOf(key) !== -1) {
        entity.reference[key] = data[key];
      } else {
        var d = data[key];
        if (isArray(d)) {
          d = _defineProperty({}, key, d);
        }
        assign(entity, d);
      }
    }
    return entity;
  },
  /**
   * Register all the listeners related to the page.
   */
  _registerListeners: function _registerListeners() {
    var _this = this;

    if (this.stores) {
      this.stores.map(function (storeConf) {
        storeConf.properties.map(function (property) {
          storeConf.store["add" + capitalize(property) + "ChangeListener"](_this._onChange);
        });
      });
    }
  },
  /**
  * Unregister all the listeners related to the page.
  */
  _unRegisterListeners: function _unRegisterListeners() {
    var _this = this;

    if (this.stores) {
      this.stores.map(function (storeConf) {
        storeConf.properties.map(function (property) {
          storeConf.store["remove" + capitalize(property) + "ChangeListener"](_this._onChange);
        });
      });
    }
  }
};

module.exports = storeMixin;

},{"lodash/lang/isArray":31,"lodash/string/capitalize":39,"object-assign":42}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;

var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {object} Initial props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderImg() {
        var className = "icon " + this.props.src;
        return React.createElement(
            "span",
            { className: className, onClick: this.props.onClick },
            " "
        );
    }
};

module.exports = builder(imgMixin);

},{}],14:[function(require,module,exports){
//Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

var checkBoxMixin = {
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type("bool"),
    label: type("string"),
    style: type("object")
  },
  getInitialState: function getInitialState() {
    return {
      isChecked: this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in  the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderCheckBox() {
    return React.createElement(
      "div",
      { className: "checkbox" },
      React.createElement(
        "label",
        null,
        React.createElement("input", { ref: "checkbox", checked: this.state.isChecked, onChange: this._onChange, type: "checkbox" }),
        React.createElement("span", { className: "ripple" }),
        React.createElement("span", { className: "check" }),
        this.props.label ? this.props.label : ""
      )
    );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({ isChecked: nextProps.value });
    }
  }
};

module.exports = builder(checkBoxMixin);

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"../i18n/mixin":12}],17:[function(require,module,exports){

//var SelectionList = focus.components.list.selection.list.component;
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Button = require("../button/action").component;
var selectionListMixin = require("../../list/selection/list").mixin;
var assign = require("object-assign");
//Pour étendre SelectionList
//TODO Comment étendre une méthode d'un mixin d'une meilleur façon que celle la ?
var MySelectionList = React.createClass(assign(selectionListMixin, {
  _renderManualFetch: function renderManualFetch() {
    if (this.props.isManualFetch && this.props.hasMoreData) {
      var style = { className: "primary" };
      return React.createElement(
        "li",
        { className: "sl-button" },
        React.createElement(Button, { label: "Next",
          type: "button",
          handleOnClick: this._handleShowMore,
          style: style })
      );
    }
  }
}));

module.exports = React.createClass({
  displayName: "exports",

  /** @inheritdoc */
  getDefaultProps: function getDefaultProps() {
    return {
      data: []
    };
  },
  /** @inheritdoc */
  getInitialState: function getInitialState() {
    return { maxElements: this.props.perPage * page };
  },
  fetchNextPage: function fetchNextPage(page) {
    /** @inheritdoc */
    this.setState({ maxElements: this.props.perPage * page });
  },
  /** @inheritdoc */
  getDataToUse: function getDataToUse() {
    if (!this.props.data) {
      return [];
    }
    return this.props.data.slice(0, this.state.maxElements ? this.state.maxElements : this.props.perPage);
  },
  /** @inheritdoc */
  render: function renderFormList() {
    var data = this.props.data || [];
    var hasMoreData = data.length > (this.state.maxElements ? this.state.maxElements : this.props.perPage);
    return React.createElement(MySelectionList, { data: this.getDataToUse(), hasMoreData: hasMoreData, lineComponent: this.props.line, isSelection: false, isManualFetch: true, fetchNextPage: this.fetchNextPage });
  }
});

},{"../../list/selection/list":23,"../button/action":2,"object-assign":42}],18:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Img = require("../img").component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {object} Defauilt props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            style: "dots-three-vertical"
        };
    },

    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */
    _handleAction: function _handleAction(action) {
        var _this = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
            } else {
                action();
            }
        };
    },

    /**
     * Generate the list of actions.
     * @param {object} operationList List of operations.
     * @returns {Array} List of action in li component.
     * @private
     */
    _getList: function _getList(operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(React.createElement(
                "li",
                { key: key, onClick: this._handleAction(operation.action), className: operation.style },
                React.createElement(
                    "a",
                    { href: "javascript:void(0)" },
                    operation.label
                )
            ));
            if (operation.childOperationList) {
                var subKey = "sub_" + key;
                liList.push(React.createElement(
                    "li",
                    { key: subKey },
                    React.createElement(
                        "ul",
                        null,
                        this._getList(operation.childOperationList)
                    )
                ));
            }
        }
        return liList;
    },

    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render: function renderSelectAcion() {
        if (this.props.operationList.length == 0) {
            return React.createElement("div", null);
        }
        var liList = this._getList(this.props.operationList);
        return React.createElement(
            "div",
            { className: "select-action btn-group" },
            React.createElement(
                "a",
                { href: window.location.pathname, "data-target": "#", className: "dropdown-toggle", "data-toggle": "dropdown" },
                React.createElement(Img, { src: this.props.style })
            ),
            React.createElement(
                "ul",
                { className: "dropdown-menu" },
                liList
            )
        );
    }

};

module.exports = builder(selectActionMixin);

},{"../img":13}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var Button = require("../../common/button/action").component;
var SelectAction = require("../../common/select-action").component;

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-contextual",

    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            operationParam: undefined
        };
    },
    /**
     * Init default state.
     * @returns {oject} Initial state.
     */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false // true if secondary actionList is expanded.
        };
    },

    /**
     * handle contextual action on click.
     * @param {string} key Action key.
     */
    _handleAction: function handleContextualAction(key) {
        var _this = this;

        return function (event) {
            event.preventDefault();
            if (_this.props.operationParam) {
                _this.props.operationList[key].action(_this.props.operationParam);
            } else {
                _this.props.operationList[key].action();
            }
        };
    },

    /**
     * render the component.
     * @returns {JSX} Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push(React.createElement(Button, { key: key, style: operation.style, handleOnClick: this._handleAction(key), label: operation.label }));
            } else {
                secondaryActionList.push(operation);
            }
        }
        return React.createElement(
            "div",
            { className: "list-action-contextual" },
            React.createElement(
                "span",
                null,
                " ",
                primaryActionList
            ),
            React.createElement(SelectAction, { operationList: secondaryActionList, operationParam: this.props.operationParam, isExpanded: this.state.isSecondaryActionListExpanded })
        );
    }
};

module.exports = builder(actionContextualMixin);

},{"../../common/button/action":2,"../../common/select-action":18}],21:[function(require,module,exports){
"use strict";

var topOfElement = (function (_topOfElement) {
    var _topOfElementWrapper = function topOfElement(_x) {
        return _topOfElement.apply(this, arguments);
    };

    _topOfElementWrapper.toString = function () {
        return _topOfElement.toString();
    };

    return _topOfElementWrapper;
})(function (element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
});
/**
 *
 * Mixin which add infinite scroll behavior.
 */
var InfiniteScrollMixin = {
    /**
     * defaults props for the mixin.
     * @returns {{isInfiniteScroll: boolean, initialPage: number, offset: number}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount: function componentWillMount() {
        this.nextPage = this.props.initialPage;
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount: function componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount: function componentDidMount() {
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate: function componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener: function scrollListener() {
        var el = this.getDOMNode();
        var scrollTop = this.parentNode.pageYOffset !== undefined ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }

        //calculate visible index in the list
        /*var topHeader = topOfElement(el);
        var pageHeight = topHeader+el.offsetHeight;
        var scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        var visibleIndex = (scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length;
        console.log(visibleIndex);*/
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener: function attachScrollListener() {
        if (!this.props.hasMoreData) {
            return;
        }
        this.parentNode.addEventListener("scroll", this.scrollListener);
        this.parentNode.addEventListener("resize", this.scrollListener);
        this.scrollListener();
    },

    /**
     * detach scroll listener on the component
     */
    detachScrollListener: function detachScrollListener() {
        this.parentNode.removeEventListener("scroll", this.scrollListener);
        this.parentNode.removeEventListener("resize", this.scrollListener);
    }
};

module.exports = { mixin: InfiniteScrollMixin };

},{}],22:[function(require,module,exports){
/**@jsx*/
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
var type = window.focus.component.types;
var ContextualActions = require("../action-contextual").component;
var CheckBox = require("../../common/input/checkbox").component;
var lineMixin = {
    displayName: "selection-line",
    /**
     * Default properties for the line.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            operationList: []
        };
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("object"),
        isSelection: type("bool"),
        isSelected: type("bool"),
        onLineClick: type("func"),
        onSelection: type("func"),
        operationList: type("array")
    },

    /**
     * State initialization.
     * @returns {{isSelected: boolean, lineItem: *}}
     */
    getInitialState: function getLineInitialState() {
        return {
            isSelected: this.props.isSelected || false
        };
    },

    /**
     * Update properties on component.
     * @param nextProps next properties
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isSelected !== undefined) {
            this.setState({ isSelected: nextProps.isSelected });
        }
    },

    /**
     * Get the line value.
     * @returns {{item: *, isSelected: (*|isSelected|boolean)}}
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data,
            isSelected: this.state.isSelected
        };
    },

    /**
     * Selection Click handler.
     * @param event
     */
    _handleSelectionClick: function handleSelectionClick(event) {
        var select = !this.state.isSelected;
        this.setState({ isSelected: select });
        if (this.props.onSelection) {
            this.props.onSelection(this.props.data, select);
        }
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event) {
        if (this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * Render the left box for selection
     * @returns {XML}
     */
    _renderSelectionBox: function renderSelectionBox() {
        if (this.props.isSelection) {
            var selectionClass = this.state.isSelected ? "selected" : "no-selection";
            //var image = this.state.isSelected? undefined : <img src={this.state.lineItem[this.props.iconfield]}/>
            return React.createElement(
                "div",
                { className: "sl-selection " + selectionClass },
                React.createElement(CheckBox, { value: this.state.isSelected, onChange: this._handleSelectionClick })
            );
        }
        return null;
    },

    /**
     * render content for a line.
     * @returns {*}
     */
    _renderLineContent: function renderLineContent() {
        if (this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        } else {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    this.props.data.title
                ),
                React.createElement(
                    "div",
                    null,
                    this.props.data.body
                )
            );
        }
    },

    /**
     * Render actions wich can be applied on the line
     */
    _renderActions: function renderLineActions() {
        if (this.props.operationList.length > 0) {
            return React.createElement(
                "div",
                { className: "sl-actions" },
                React.createElement(ContextualActions, { operationList: this.props.operationList, operationParam: this.props.data })
            );
        }
    },

    /**
     * Render line in list.
     * @returns {*}
     */
    render: function renderLine() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                "li",
                { className: "sl-line" },
                this._renderSelectionBox(),
                React.createElement(
                    "div",
                    { className: "sl-content", onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

module.exports = { mixin: lineMixin };

},{"../../common/input/checkbox":14,"../action-contextual":20}],23:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Line = require("./line").mixin;
var Button = require("../../common/button/action").component;
var type = window.focus.component.types;
var InfiniteScrollMixin = require("./infinite-scroll").mixin;

var listMixin = {
    mixins: [InfiniteScrollMixin],
    /**
     * Display name.
     */
    displayName: "selection-list",

    /**
     * Default properties for the list.
     * @returns {{isSelection: boolean}} the default properties
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            isAllSelected: false,
            selectionStatus: "partial",
            isLoading: false,
            hasMoreData: false,
            operationList: [],
            isManualFetch: false,
            idField: "id"
        };
    },

    /**
     * list property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("array"),
        isSelection: type("bool"),
        isAllSelected: type("bool"),
        onSelection: type("func"),
        onLineClick: type("func"),
        isLoading: type("bool"),
        loader: type("func"),
        FetchNextPage: type("func"),
        operationList: type("array"),
        isManualFetch: type("bool"),
        idField: type("string")
    },

    /**
     * Return selected items in the list.
     * @return {Array} selected items
     */
    getSelectedItems: function getListSelectedItems() {
        var selected = [];
        for (var i = 1; i < this.props.data.length + 1; i++) {
            var lineName = "line" + i;
            var lineValue = this.refs[lineName].getValue();
            if (lineValue.isSelected) {
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*}
     */
    fetchNextPage: function fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param {object} event event received
     */
    _handleShowMore: function handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    },

    /**
     * Render lines of the list.
     * @returns {*} DOM for lines
     */
    _renderLines: function renderLines() {
        var _this = this;

        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map(function (line) {
            var isSelected;
            switch (_this.props.selectionStatus) {
                case "none":
                    isSelected = false;
                    break;
                case "selected":
                    isSelected = true;
                    break;
                case "partial":
                    isSelected = undefined;
                    break;
                default:
                    isSelected = false;
            }
            return React.createElement(LineComponent, {
                key: line[_this.props.idField],
                data: line,
                ref: "line" + lineCount++,
                isSelection: _this.props.isSelection,
                isSelected: isSelected,
                onSelection: _this.props.onSelection,
                onLineClick: _this.props.onLineClick,
                operationList: _this.props.operationList
            });
        });
    },
    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                "li",
                { className: "sl-loading" },
                "Loading ..."
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: "primary" };
            return React.createElement(
                "li",
                { className: "sl-button" },
                React.createElement(Button, { label: "list.selection.button.showMore",
                    type: "button",
                    handleOnClick: this._handleShowMore,
                    style: style })
            );
        }
    },

    /**
     * Render the list.
     * @returns {XML} DOM of the component
     */
    render: function renderList() {
        return React.createElement(
            "ul",
            { className: "selection-list" },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);

},{"../../common/button/action":2,"./infinite-scroll":21,"./line":22}],24:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],25:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],26:[function(require,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],27:[function(require,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],28:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],29:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":30,"../lang/isArray":31,"../object/keysIn":38,"../support":41,"./isIndex":26,"./isLength":27}],30:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return isLength(length) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{"../internal/isLength":27,"../internal/isObjectLike":28}],31:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/isLength":27,"../internal/isObjectLike":28,"./isNative":34}],32:[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isFunction = require('./isFunction'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike'),
    isString = require('./isString'),
    keys = require('../object/keys');

/**
 * Checks if `value` is empty. A value is considered empty unless it is an
 * `arguments` object, array, string, or jQuery-like collection with a length
 * greater than `0` or an object with own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  var length = value.length;
  if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
      (isObjectLike(value) && isFunction(value.splice)))) {
    return !length;
  }
  return !keys(value).length;
}

module.exports = isEmpty;

},{"../internal/isLength":27,"../internal/isObjectLike":28,"../object/keys":37,"./isArguments":30,"./isArray":31,"./isFunction":33,"./isString":36}],33:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":24,"./isNative":34}],34:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":28,"../string/escapeRegExp":40}],35:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (!!value && type == 'object');
}

module.exports = isObject;

},{}],36:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":28}],37:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":27,"../internal/shimKeys":29,"../lang/isNative":34,"../lang/isObject":35}],38:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":26,"../internal/isLength":27,"../lang/isArguments":30,"../lang/isArray":31,"../lang/isObject":35,"../support":41}],39:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Capitalizes the first character of `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('fred');
 * // => 'Fred'
 */
function capitalize(string) {
  string = baseToString(string);
  return string && (string.charAt(0).toUpperCase() + string.slice(1));
}

module.exports = capitalize;

},{"../internal/baseToString":25}],40:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":25}],41:[function(require,module,exports){
(function (global){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = /\bthis\b/.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}]},{},[1])(1)
});