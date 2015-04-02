(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.common||(g.common = {}));g.stickyNavigation = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var type = window.focus.component.types;
/**
 * Mixin component for the sticky navigation.
 * @type {Object}
 */
var stickyNavigationMixin = {

    /** @inheritedDoc */
    displayName: "sticky-navigation",

    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            /**
             * Selector for the content to be watched.
             * @type {String}
             */
            contentSelector: undefined,
            /**
             * Identifier of the Navbar created for the sticky navigation.
             * @type {String}
             */
            navBarId: "navbar",
            /**
             * Selector for the title elements to display in the sticky navigation.
             * @type {String}
             */
            titleSelector: "[data-menu]",
            /**
             * Style informations such as the className.
             * @type {Object}
             */
            style: {}
        };
    },
    /** @inheritedDoc */
    propTypes: {
        contentSelector: type("string"),
        navBarId: type("string"),
        titleSelector: type("string"),
        style: type("object")
    },
    /** @inheritedDoc */
    getInitialState: function getStickyNavigationInitialState() {
        return { menuList: [] };
    },
    /** @inheritedDoc */
    componentDidMount: function stickyNavigationDidMount() {
        //The list is processed only when the component is mounted.
        this._buildMenuList();
        //Set bootstrap data attributes to register the spy.
        this._registerScrollSpyAttributes();
    },
    /**
     * Build the menu list from the title attributes read in the selector.
     */
    _buildMenuList: function buildMenuList() {
        //Get all title elements form the DOM elements read in the selector.
        var titleListElements = document.querySelectorAll(this.props.titleSelector);
        var menuList = [];
        for (var key in titleListElements) {
            menuList.push(this._renderLink(titleListElements[key]));
        }
        //Update the menu list into the state.
        this.setState({ menuList: menuList });
    },
    _registerScrollSpyAttributes: function registerScrollSpyAttributes() {
        var content = document.querySelector(this.props.contentSelector);
        content.setAttribute("data-spy", "scroll");
        content.setAttribute("data-target", "#" + this.props.navBarId);
    },
    /** @inheritedDoc */
    render: function renderStickyNavigation() {
        var className = "sticky-navigation bs-docs-sidebar hidden-print hidden-xs hidden-sm affix " + this.props.style.className;
        return React.createElement(
            "nav",
            { className: className, id: this.props.navBarId },
            React.createElement(
                "ul",
                { className: "nav bs-docs-sidenav", role: "tablist" },
                this.state.menuList
            )
        );
    },
    /**
     * Render the list of links.
     * @param anchor
     * @returns {JSX}
     */
    _renderLink: function renderLink(title) {
        if (title.getAttribute) {
            var link = "#" + title.getAttribute("id");
            return React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: link },
                    title.innerText
                )
            );
        }
    }
};

module.exports = builder(stickyNavigationMixin);

},{}]},{},[1])(1)
});