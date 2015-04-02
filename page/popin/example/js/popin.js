(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.page||(g.page = {}));g.popin = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;

/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {

    /**
     * Display name.
     */
    displayName: "popin",

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            animation: "right", // right, left, up, down
            type: "full", // full, centered
            displaySelector: undefined, // Html selector of the element wich open/close the modal when click on it.
            contentLoadingFunction: undefined // Function wich returns the content of the modal.
        };
    },

    /**
     * Initial state.
     * @returns {object} Initial state values
     */
    getInitialState: function getInitialState() {
        return {
            isDisplayed: false // True if modal is displayed
        };
    },
    /**
     * Declare the open action.
     */
    componentDidMount: function popinDidMount() {
        var source = document.querySelector(this.props.displaySelector);
        var currentView = this;
        source.onclick = function () {
            currentView.setState({ isDisplayed: !currentView.state.isDisplayed });
        };
    },

    /**
     * Open the modal.
     */
    openModal: function openModal() {
        this.setState({ isDisplayed: true });
    },
    /**
     * Close the modal.
     */
    closeModal: function closeModal() {
        this.setState({ isDisplayed: false });
    },

    /**
     * Css class of modal.
     * @returns {string} css classes.
     * @private
     */
    _getModalCss: function _getModalCss() {
        var cssClass = "popin animated float:right;";
        switch (this.props.animation) {
            case "right":
                cssClass += " bounceInRight right";
                break;
            case "left":
                cssClass += " bounceInLeft left";
                break;
            case "down":
                cssClass += " bounceInDown down";
                break;
            case "up":
                cssClass += " bounceInUp up";
                break;
        }
        return cssClass;
    },
    /**
     * Content css class.
     * @returns {string} css classes.
     * @private
     */
    _getModalContentCss: function _getModalContentCss() {
        var cssClass = "modal-content";
        switch (this.props.type) {
            case "full":
                cssClass += " full";
                break;
            case "centered":
                cssClass += " centered";
                break;
        }
        return cssClass;
    },

    /**
     * Render the component.
     * @returns {JSX} Html code.
     */
    render: function renderPopin() {
        if (!this.state.isDisplayed) {
            return React.createElement("div", null);
        }
        return React.createElement(
            "span",
            { className: this._getModalCss() },
            React.createElement(
                "div",
                { className: this._getModalContentCss() },
                this.renderPopinHeader(this),
                React.createElement(
                    "div",
                    { className: "modal-body" },
                    this.renderContent(this)
                ),
                this.renderPopinFooter(this)
            )
        );
    }
};

module.exports = builder(popinMixin);

},{}]},{},[1])(1)
});