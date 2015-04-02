(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.block = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
var Title = require("../title").component;
var i18nMixin = require("../i18n").mixin;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  mixins: [i18nMixin],
  getDefaultProps: function getDefaultProps() {
    return {
      style: {}
    };
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return this.i18n(this.props.title);
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      "div",
      { className: "block " + this.props.style.className },
      React.createElement(Title, { id: this.props.style.titleId, title: this.heading() }),
      this.props.children
    );
  }
};
module.exports = builder(blockMixin);

},{"../i18n":2,"../title":4}],2:[function(require,module,exports){
"use strict";

module.exports = {
  mixin: require("./mixin")
};

},{"./mixin":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;

var titleMixin = {

    /**
     * Display name.
     */
    displayName: "title",

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            id: undefined,
            title: undefined
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderStickyNavigation() {
        return React.createElement(
            "h3",
            { id: this.props.id, "data-menu": true },
            this.props.title
        );
    }

};

module.exports = builder(titleMixin);

},{}]},{},[1])(1)
});