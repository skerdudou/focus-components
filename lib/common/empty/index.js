'use strict';

var builder = require('focus-core').component.builder;
var React = require('react');
var emptyMixin = {
  render: function render() {
    return React.createElement('div', { 'data-focus': 'empty' });
  }
};

module.exports = builder(emptyMixin);