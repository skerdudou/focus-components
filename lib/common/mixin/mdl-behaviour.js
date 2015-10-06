//https://github.com/google/material-design-lite/blob/master/src/mdlComponentHandler.js#L333
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var mdlBehaviourMixin = {

    /**
    * Called when component is mounted.
    */
    componentDidMount: function componentDidMount() {
        if (ReactDOM.findDOMNode(this)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this));
        }
    },

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount: function componentWillUnmount() {
        if (ReactDOM.findDOMNode(this)) {
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this));
        }
    }

};

module.exports = mdlBehaviourMixin;