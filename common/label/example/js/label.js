(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.label = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../i18n/mixin":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});