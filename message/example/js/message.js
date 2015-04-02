(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.focusComponents || (g.focusComponents = {})).message = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var type = window.focus.component.types;
var messageMixin = {
  /** @inheritedDoc */
  getDefaultProps: function getMessageDefaultProps() {
    return {
      title: undefined,
      content: undefined,
      type: "info",
      ttl: undefined,
      style: {}
    };
  },
  /** @inheritedDoc */
  propTypes: {
    title: type("string"),
    content: type("string"),
    type: type("string"),
    ttl: type("number"),
    style: type("object")
  },
  /**
   * Handle click on the dismiss button.
   * @param {Event} event - Sanitize event.
   */
  _handleOnClick: function handleOnClickMessageDismiss(event) {
    //Maybe it is not the best way to do it.
    React.unmountComponentAtNode(this.getDOMNode().parentNode);
  },
  /**
   * Render an alert.
   * @return {JSX} The jsx.
   */
  render: function renderAlert() {
    var cssClass = "alert alert-dismissable alert-" + this.props.type + " " + this.props.style.className;
    return React.createElement(
      "div",
      { className: cssClass },
      React.createElement(
        "button",
        { type: "button", className: "close", "data-dismiss": "alert", onClick: this._handleOnClick },
        "×"
      ),
      React.createElement(
        "h4",
        null,
        this.props.title
      ),
      React.createElement(
        "p",
        null,
        this.props.content
      )
    );
  }
};
module.exports = builder(messageMixin);

},{}]},{},[1])(1)
});