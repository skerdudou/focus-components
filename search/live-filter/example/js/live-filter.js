(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focus||(g.focus = {}));g=(g.components||(g.components = {}));g=(g.search||(g.search = {}));g.liveFilter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = require("focus/component/builder");
var React = window.React;
var LiveFilterFacet = require("./live-filter-facet").component;

var liveFilterMixin = {
    displayName: "live-filter",
    /**
     * Init the state of the component.
     * @returns {{isExpanded: boolean, selectedFacets: Array}}
     */
    getInitialState: function getInitialState() {
        return {
            isExpanded: true,
            selectedFacetList: this.props.selectedFacetList || {},
            openedFacetList: this.props.openedFacetList || {}
        };
    },
    /**
     * Render the component.
     * @returns Html component code.
     */
    render: function renderLiverFilter() {
        var className = this.state.isExpanded ? "live-filter" : "live-filter collapsed";
        return React.createElement(
            "div",
            { className: className },
            this.renderLiveFacetTitle(),
            this.renderFilterFacetList()
        );
    },
    /**
     * Render the div title of the component.
     * @Returns Html title code.
     */
    renderLiveFacetTitle: function renderLiveFacetTitle() {
        var title = this.state.isExpanded ? "live.filter.title" : "";
        return React.createElement(
            "div",
            { className: "header" },
            React.createElement(
                "span",
                { className: "title" },
                title
            ),
            React.createElement(
                "span",
                { className: "icon", onClick: this.liveFilterTitleClick },
                " "
            )
        );
    },
    /**
     * Render the list of the facets.
     * @Returns Html facets code.
     */
    renderFilterFacetList: function renderFilterFacetList() {
        if (!this.state.isExpanded) {
            return;
        }
        var facets = [];
        var isExpanded = Object.keys(this.state.openedFacetList).length == 0;
        for (var key in this.props.facetList) {
            var selectedDataKey = this.state.selectedFacetList[key] ? this.state.selectedFacetList[key].key : undefined;
            facets.push(React.createElement(LiveFilterFacet, { facetKey: key,
                facet: this.props.facetList[key],
                selectedDataKey: selectedDataKey,
                isExpanded: isExpanded || this.state.openedFacetList[key],
                expandHandler: this.expandFacetHandler,
                selectHandler: this.selectHandler,
                type: this.props.config[key] }));
            isExpanded = false;
        }
        return React.createElement(
            "div",
            null,
            facets
        );
    },

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    liveFilterTitleClick: function liveFilterTitleClick() {
        this.setState({ isExpanded: !this.state.isExpanded });
    },

    /**
     * Action on facet selection.
     */
    selectHandler: function selectLiverFilterHandler(facetKey, dataKey, data) {
        var selectedFacetList = this.state.selectedFacetList;
        if (dataKey == undefined) {
            delete selectedFacetList[facetKey];
        } else {
            selectedFacetList[facetKey] = { key: dataKey, data: data };
        }
        this.setState({ selectedFacetList: selectedFacetList });

        this.props.handler(this.state.selectedFacetList);
    },
    expandFacetHandler: function expandFacetHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({ openedFacetList: openedFacetList });
    },
    getValue: function getValue() {
        return {
            selectedFacetList: this.state.selectedFacetList,
            openedFacetList: this.state.openedFacetList
        };
        /*
        return {
            selectedFacetList: {
                "FCT_PAYS": {key: "FRA", data: {label:"France", count:6}}
            },
            openedFacetList: ["FCT_STATUS"]
        };*/
    }
};

module.exports = builder(liveFilterMixin);

},{"./live-filter-facet":12,"focus/component/builder":2}],2:[function(require,module,exports){
"use strict";

var React = window.React;
var assign = require("object-assign");
var isObject = require("lodash/lang/isObject");
var isFunction = require("lodash/lang/isFunction");
/**
 * Build a module with a mixin and a React component.
 * @param  {object} componentMixin - Mixin of the component.
 * @return {object} {mixin: 'the component mixin', component: 'the react instanciated component'}
 */
module.exports = function (componentMixin) {
  return {
    mixin: componentMixin,

    /*extend: function extendMixin(properties){
      if(isFunction(componentMixin)){
        throw new Error('You cannot extend a mixin function');
      }
      if(!isObject(properties)){
        throw new Error('properties should be an object');
      }
      return assign({}, componentMixin, properties);
    },*/
    component: React.createClass(componentMixin)
  };
};
},{"lodash/lang/isFunction":6,"lodash/lang/isObject":8,"object-assign":10}],3:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],4:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],5:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],6:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":3,"./isNative":7}],7:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":5,"../string/escapeRegExp":9}],8:[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],9:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":4}],10:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],11:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = require("focus/component/builder");
var React = window.React;

var liveFilterDataMixin = {
    displayName: "live-filter-data",
    /**
     * Render the component.
     * @returns Html code of the component.
     */
    render: function renderFacet() {
        return React.createElement(
            "div",
            { className: "lf-data", onClick: this.selectFacetData },
            this.renderData(),
            " "
        );
    },

    renderData: function renderData() {
        if (this.props.type == "text") {
            return this.props.data.label + " (" + this.props.data.count + ")";
        }
        throw new Error("Unknown property type : " + this.props.type);
    },

    /**
     * Action of selection.
     */
    selectFacetData: function selectFacetDetail() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
};

module.exports = builder(liveFilterDataMixin);

},{"focus/component/builder":2}],12:[function(require,module,exports){
"use strict";

/**@jsx*/
var builder = require("focus/component/builder");
var React = window.React;
var Data = require("./live-filter-data").component;

var liveFilterFacetMixin = {
    displayName: "live-filter-facet",
    /**
     * Init the component state.
     * @returns {{isExpanded: boolean)}}
     */
    getInitialState: function getInitialState() {
        return {
            isShowAll: false
        };
    },
    getDefaultProps: function getLiveFilterFacetDefaultProperties() {
        return {
            nbDefaultDataList: 6
        };
    },

    /**
     * Render the component.
     * @returns Html component code.
     */
    render: function renderLiverFilterFacet() {
        var className = this.props.isExpanded ? "lf-facet" : "lf-facet collapsed";
        if (this.props.selectedDataKey) {
            className = "lf-facet selected";
        }
        return React.createElement(
            "div",
            { className: className },
            this.renderLiveFilterFacetTitle(),
            this.renderLiveFilterDataList()
        );
    },

    /**
     * Render the component title.
     * @returns Html component code.
     */
    renderLiveFilterFacetTitle: function renderLiveFilterFacetTitle() {
        var title = this.props.facetKey;
        if (this.props.selectedDataKey) {
            title += " : " + this.props.facet[this.props.selectedDataKey].label;
        }
        return React.createElement(
            "div",
            { className: "title", onClick: this.liveFilterFacetTitleClick },
            title
        );
    },

    /**
     * Action on facte title click.
     */
    liveFilterFacetTitleClick: function liveFilterFacetTitleClick() {
        this.props.expandHandler(this.props.facetKey, !this.props.isExpanded);
        if (this.props.selectedDataKey) {
            this.props.selectHandler(this.props.facetKey, undefined, undefined);
        }
        this.setState({ isExpanded: !this.props.isExpanded, isShowAll: false });
    },

    /**
     * Render the list of data of the facet.
     * @returns Html component code.
     */
    renderLiveFilterDataList: function renderLiveFilterDataList() {
        if (!this.props.isExpanded || this.props.selectedDataKey) {
            return;
        }
        var facetDetailList = [];
        var i = 0;
        for (var key in this.props.facet) {
            if (!this.state.isShowAll && i >= this.props.nbDefaultDataList) {
                break;
            }
            facetDetailList.push(React.createElement(
                "li",
                null,
                React.createElement(Data, { dataKey: key, data: this.props.facet[key], selectHandler: this.selectHandler, type: this.props.type })
            ));
            i++;
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "ul",
                null,
                facetDetailList
            ),
            " ",
            this.renderShowAllDataList()
        );
    },

    /**
     * Action on facet data selection.
     */
    selectHandler: function selectHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },

    renderShowAllDataList: function renderShowAllDataList() {
        if (!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return React.createElement(
                "div",
                { className: "show-all", onClick: this.showAllHandler },
                " show.alls "
            );
        }
    },

    showAllHandler: function showAllHandler() {
        this.setState({ isShowAll: !this.state.isShowAll });
    }
};

module.exports = builder(liveFilterFacetMixin);

},{"./live-filter-data":11,"focus/component/builder":2}]},{},[1])(1)
});