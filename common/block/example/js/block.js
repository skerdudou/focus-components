(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.block = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = require("focus/component/builder");
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return React.createElement(
        "div",
        { className: "panel-heading" },
        this.props.title
      );
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      "div",
      { className: "panel panel-default" },
      this.heading(),
      React.createElement(
        "div",
        { className: "panel-body" },
        this.props.children
      )
    );
  }
};
module.exports = builder(blockMixin);

},{"focus/component/builder":2}],2:[function(require,module,exports){
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
},{"object-assign":3}],3:[function(require,module,exports){
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