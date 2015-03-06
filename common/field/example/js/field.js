(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.field = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;
var Input = require("../input/text").component;
var Label = require("../label").component;
var FieldMixin = {
	/**
  * Get field default properties.
  */
	getDefaultProps: function getFieldDefaultProps() {
		return {
			hasLabel: true,
			labelSize: 3,
			type: "text",
			value: undefined,
			name: undefined
		};
	},
	/**
  * Get the css class of the field component.
  */
	_className: function _className() {
		var stateClass = this.props.error ? "has-feedback has-error" : "";
		return "form-group " + stateClass;
	},
	label: function label() {
		if (this.props.hasLabel) {
			var labelClassName = "control-label col-sm-" + this.props.labelSize;
			return React.createElement(
				"label",
				{ className: labelClassName,
					name: this.props.name,
					key: this.props.name },
				" ",
				this.props.name,
				" "
			);
		}
	},
	/**
  * Validate the field.
  * @return {object} - undefined if valid, {name: "errors"} if not valid.
  */
	validate: function validate() {
		return this.refs.input.validate();
	},
	/**
  * Get the value from the field.
  */
	getValue: function getValue() {
		return this.refs.input.getValue();
	},
	input: function input() {
		var inputClassName = "form-control col-sm-" + (12 - this.props.labelSize);
		var addOn = function () {
			"";
		};
		var feedBack = function () {
			"";
		};
		return React.createElement(
			"div",
			{ className: "input-group" },
			React.createElement(Input, { style: {
					"class": inputClassName
				},
				id: this.props.name,
				name: this.props.name,
				value: this.props.value,
				type: this.props.type,
				ref: "input" })
		);
	},
	error: function error() {
		if (this.props.error) {
			return (
				/*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
				React.createElement(
					"span",
					{ className: "help-block" },
					" ",
					this.props.error,
					" "
				)
			);
		}
	},
	help: function help() {
		if (this.props.help) {
			return React.createElement(
				"span",
				{ className: "help-block" },
				" ",
				this.props.help,
				" "
			);
		}
	},
	render: function renderField() {
		return React.createElement(
			"div",
			{ className: this._className() },
			" ",
			this.label(),
			" ",
			this.input(),
			" ",
			this.help(),
			" ",
			this.error(),
			" "
		);
	}
};
module.exports = builder(FieldMixin);

},{"../input/text":2,"../label":3,"focus/component/builder":4}],2:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;
var type = require("focus/component/types");
/**
 * Input text mixin.
 * @type {Object}
 */
var inputText = {
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: "text",
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    type: type("string"),
    value: type(["string", "number"]),
    name: type("string"),
    style: type("object")
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validate: function validateInput() {
    var value = this.getValue();
    if (value === undefined || value === "") {
      return "Le champ " + this.props.name + " est requis";
    }
    if (this.props.validator) {
      return this.props.validator(value);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render an input.
   * @return {[type]} [description]
   */
  render: function renderInput() {
    return React.createElement("input", { id: this.props.name,
      name: this.props.name,
      value: this.props.value,
      type: this.props.type,
      className: this.props.style["class"],
      onChange: this.props.onChange
    });
  }
};

module.exports = builder(inputText);

},{"focus/component/builder":4,"focus/component/types":5}],3:[function(require,module,exports){
"use strict";

var builder = require("focus/component/builder");
var React = window.React;
/**
 * Label mixin for form.
 * @type {Object}
 */
var labelMixin = {
	getDefaultProps: function getDefaultProps() {
		return {
			name: undefined,
			key: undefined
		};
	},
	i18n: function i18n(prop) {
		return prop;
	},
	render: function render() {
		return React.createElement(
			"label",
			{ className: this.props.css,
				htmlFor: this.props.name },
			" ",
			this.i18n(this.props.value),
			" "
		);
	}
};

module.exports = builder(labelMixin);

},{"focus/component/builder":4}],4:[function(require,module,exports){
"use strict";

var React = window.React;
var assign = require("object-assign");
//var isObject = require('lodash/lang/isObject');
//var isFunction = require('lodash/lang/isFunction');

/**
 * Create a component with a mixin except id the component is mixin only.
 * @param {object}  mixin - The component mixin.
 * @param {Boolean} isMixinOnly - define if the component is a mixin only.
 * @return {object} - {component} the built react component.
 */
function createComponent(mixin, isMixinOnly) {
  if (isMixinOnly) {
    return undefined; //Error('Your class publish a mixin only...');
  }
  return { component: React.createClass(mixin) };
}

/**
 * Build a module with a mixin and a React component.
 * @param  {object} componentMixin - Mixin of the component.
 * @param {boolean} isMixinOnly - Bolean to set .
 * @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
 */
module.exports = function (componentMixin, isMixinOnly) {

  return assign({
    mixin: componentMixin
    /*extend: function extendMixin(properties){
      if(isFunction(componentMixin)){
        throw new Error('You cannot extend a mixin function');
      }
      if(!isObject(properties)){
        throw new Error('properties should be an object');
      }
      return assign({}, componentMixin, properties);
    },*/
  }, createComponent(componentMixin, isMixinOnly));
};
},{"object-assign":13}],5:[function(require,module,exports){
"use strict";

//Dependencies.
var React = window.React;
var isString = require("lodash/lang/isString");
var isArray = require("lodash/lang/isArray");

/**
 * Expose a React type validation for the component properties validation.
 * @see http://facebook.github.io/react/docs/reusable-components.html
 * @param  {string} type - String or array of the types to use.
 * @return {object} The corresponding react type.
 */
module.exports = function (type) {
  var isStringType = isString(type);
  if (!isStringType && !isArray(type)) {
    throw new Error("The type should be a string or an array");
  }
  if (isStringType) {
    return React.PropTypes[type];
  }
  return React.PropTypes.oneOf(type);
};
},{"lodash/lang/isArray":9,"lodash/lang/isString":11}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],8:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],9:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
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
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":7,"../internal/isObjectLike":8,"./isNative":10}],10:[function(require,module,exports){
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
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
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
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":8,"../string/escapeRegExp":12}],11:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
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
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":8}],12:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":6}],13:[function(require,module,exports){
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