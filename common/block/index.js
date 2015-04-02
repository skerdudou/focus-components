var React = require('react');
var builder = require('focus').component.builder
var Title = require('../title').component;
var i18nMixin = require('../i18n').mixin;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  mixins: [i18nMixin],
  getDefaultProps: function(){
    return {
      style: {}
    }
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function(){
    if(this.props.title){
      return this.i18n(this.props.title);
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock(){
    return(
      <div className={`block ${this.props.style.className}`}>
        <Title id={this.props.style.titleId} title={this.heading()} />
        {this.props.children}
      </div>
    );
  }
}
module.exports = builder(blockMixin);
