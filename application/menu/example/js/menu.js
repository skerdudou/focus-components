(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.application||(g.application = {}));g.menu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

var menuMixin = {
  /** @inheritedProps*/
  getDefaultProps: function getMenuDefaultProps() {
    return {
      direction: "vertical", //horizontal
      position: "left", // top, bottom, right, left
      links: [],
      open: false
    };
  },
  /** @inheritedProps*/
  getInitialState: function getMenuDefaultState() {
    return {
      open: this.props.open
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle: function toggleOpenMenu() {
    this.setState({ open: !this.state.open });
  },
  /**
   * Render the links of the menu
   */
  renderLinks: function renderLinks() {
    return this.props.links.map(function (link) {
      return React.createElement(
        "a",
        { href: link.url },
        link.name
      );
    });
  },
  /** @inheriteddoc */
  render: function render() {
    var className = "menu menu-" + this.props.direction + " menu-" + this.props.position + " menu-" + (this.state.open ? "open" : "");
    return React.createElement(
      "nav",
      { className: className },
      React.createElement(
        "h3",
        null,
        this.props.title
      ),
      this.renderLinks()
    );
  }
};

module.exports = builder(menuMixin);

},{}]},{},[1])(1)
});