(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.topicDisplayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;

var topicDisplayerMixin = {

    /**
     * Display name.
     */
    displayName: "topic-displayer",

    /**
     * Default props.
     * @returns {object} Defautl props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction: function topicClickAction(key) {}, // Action when click on topic
            topicList: {} // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics
        };
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderSelectAcion() {
        var topicList = [];
        var className = "btn btn-primary btn-raised topic";
        for (var key in this.props.topicList) {
            topicList.push(React.createElement(
                "a",
                { key: key, href: "javascript:void(0)", onClick: this.topicClickHandler(key), className: className },
                this.props.topicList[key]
            ));
        }
        var style = "topic-displayer bs-component ";
        if (this.props.style) {
            style += this.props.style;
        }
        return React.createElement(
            "p",
            { className: style },
            topicList
        );
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(key) {
        var _this = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            _this.props.topicClickAction(key);
        };
    }
};

module.exports = builder(topicDisplayerMixin);

},{}]},{},[1])(1)
});