(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.focusComponents||(g.focusComponents = {}));g=(g.list||(g.list = {}));g.selection = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {
    line: require("./line"),
    list: require("./list")
};

},{"./line":8,"./list":9}],2:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
var Img = require("../../img").component;

/**/
var buttonMixin = {
	getDefaultProps: function getInputDefaultProps() {
		return {
			type: "submit",
			action: undefined,
			isPressed: false,
			style: {},
			label: undefined,
			imgSrc: undefined
		};
	},
	handleOnClick: function handleButtonOnclick() {
		if (this.props.handleOnClick) {
			return this.props.handleOnClick.apply(this, arguments);
		}
		if (!this.props.action || !this.action[this.props.action]) {
			console.warn("Your button action is not implemented");
			return;
		}
		return this.action[this.props.action].apply(this, arguments);
	},
	getInitialState: function getInitialState() {
		return {
			isPressed: this.props.isPressed
		};
	},
	_className: function buttonClassName() {
		return "btn btn-raised " + (this.props.style.className ? "btn-" + this.props.style.className : "");
	},
	renderPressedButton: function renderPressedButton() {
		return React.createElement(
			"button",
			null,
			"Loading..."
		);
	},
	/**
  * Render the button.
  * @return {[type]} [description]
  */
	render: function renderInput() {
		if (this.state.isPressed) {
			return this.renderPressedButton();
		}
		if (this.props.imgSrc) {
			return React.createElement(Img, { src: this.props.imgSrc, onClick: this.handleOnClick });
		}
		return React.createElement(
			"button",
			{ href: "javascript:void(0)", onClick: this.handleOnClick, type: this.props.type, className: this._className() },
			this.props.label
		);
	}
};

module.exports = builder(buttonMixin);

},{"../../img":3}],3:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;

var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {object} Initial props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns {XML} Html code.
     */
    render: function renderImg() {
        var className = "icon " + this.props.src;
        return React.createElement(
            "span",
            { className: className, onClick: this.props.onClick },
            " "
        );
    }
};

module.exports = builder(imgMixin);

},{}],4:[function(require,module,exports){
//Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

var checkBoxMixin = {
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type("bool"),
    label: type("string"),
    style: type("object")
  },
  getInitialState: function getInitialState() {
    return {
      isChecked: this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in  the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderCheckBox() {
    return React.createElement(
      "div",
      { className: "checkbox" },
      React.createElement(
        "label",
        null,
        React.createElement("input", { ref: "checkbox", checked: this.state.isChecked, onChange: this._onChange, type: "checkbox" }),
        React.createElement("span", { className: "ripple" }),
        React.createElement("span", { className: "check" }),
        this.props.label ? this.props.label : ""
      )
    );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({ isChecked: nextProps.value });
    }
  }
};

module.exports = builder(checkBoxMixin);

},{}],5:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Img = require("../img").component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {object} Defauilt props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            style: "dots-three-vertical"
        };
    },

    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */
    _handleAction: function _handleAction(action) {
        var _this = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
            } else {
                action();
            }
        };
    },

    /**
     * Generate the list of actions.
     * @param {object} operationList List of operations.
     * @returns {Array} List of action in li component.
     * @private
     */
    _getList: function _getList(operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(React.createElement(
                "li",
                { key: key, onClick: this._handleAction(operation.action), className: operation.style },
                React.createElement(
                    "a",
                    { href: "javascript:void(0)" },
                    operation.label
                )
            ));
            if (operation.childOperationList) {
                var subKey = "sub_" + key;
                liList.push(React.createElement(
                    "li",
                    { key: subKey },
                    React.createElement(
                        "ul",
                        null,
                        this._getList(operation.childOperationList)
                    )
                ));
            }
        }
        return liList;
    },

    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render: function renderSelectAcion() {
        if (this.props.operationList.length == 0) {
            return React.createElement("div", null);
        }
        var liList = this._getList(this.props.operationList);
        return React.createElement(
            "div",
            { className: "select-action btn-group" },
            React.createElement(
                "a",
                { href: window.location.pathname, "data-target": "#", className: "dropdown-toggle", "data-toggle": "dropdown" },
                React.createElement(Img, { src: this.props.style })
            ),
            React.createElement(
                "ul",
                { className: "dropdown-menu" },
                liList
            )
        );
    }

};

module.exports = builder(selectActionMixin);

},{"../img":3}],6:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var Button = require("../../common/button/action").component;
var SelectAction = require("../../common/select-action").component;

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-contextual",

    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            operationParam: undefined
        };
    },
    /**
     * Init default state.
     * @returns {oject} Initial state.
     */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false // true if secondary actionList is expanded.
        };
    },

    /**
     * handle contextual action on click.
     * @param {string} key Action key.
     */
    _handleAction: function handleContextualAction(key) {
        var _this = this;

        return function (event) {
            event.preventDefault();
            if (_this.props.operationParam) {
                _this.props.operationList[key].action(_this.props.operationParam);
            } else {
                _this.props.operationList[key].action();
            }
        };
    },

    /**
     * render the component.
     * @returns {JSX} Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push(React.createElement(Button, { key: key, style: operation.style, handleOnClick: this._handleAction(key), label: operation.label }));
            } else {
                secondaryActionList.push(operation);
            }
        }
        return React.createElement(
            "div",
            { className: "list-action-contextual" },
            React.createElement(
                "span",
                null,
                " ",
                primaryActionList
            ),
            React.createElement(SelectAction, { operationList: secondaryActionList, operationParam: this.props.operationParam, isExpanded: this.state.isSecondaryActionListExpanded })
        );
    }
};

module.exports = builder(actionContextualMixin);

},{"../../common/button/action":2,"../../common/select-action":5}],7:[function(require,module,exports){
"use strict";

var topOfElement = (function (_topOfElement) {
    var _topOfElementWrapper = function topOfElement(_x) {
        return _topOfElement.apply(this, arguments);
    };

    _topOfElementWrapper.toString = function () {
        return _topOfElement.toString();
    };

    return _topOfElementWrapper;
})(function (element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
});
/**
 *
 * Mixin which add infinite scroll behavior.
 */
var InfiniteScrollMixin = {
    /**
     * defaults props for the mixin.
     * @returns {{isInfiniteScroll: boolean, initialPage: number, offset: number}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount: function componentWillMount() {
        this.nextPage = this.props.initialPage;
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount: function componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount: function componentDidMount() {
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate: function componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener: function scrollListener() {
        var el = this.getDOMNode();
        var scrollTop = this.parentNode.pageYOffset !== undefined ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }

        //calculate visible index in the list
        /*var topHeader = topOfElement(el);
        var pageHeight = topHeader+el.offsetHeight;
        var scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        var visibleIndex = (scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length;
        console.log(visibleIndex);*/
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener: function attachScrollListener() {
        if (!this.props.hasMoreData) {
            return;
        }
        this.parentNode.addEventListener("scroll", this.scrollListener);
        this.parentNode.addEventListener("resize", this.scrollListener);
        this.scrollListener();
    },

    /**
     * detach scroll listener on the component
     */
    detachScrollListener: function detachScrollListener() {
        this.parentNode.removeEventListener("scroll", this.scrollListener);
        this.parentNode.removeEventListener("resize", this.scrollListener);
    }
};

module.exports = { mixin: InfiniteScrollMixin };

},{}],8:[function(require,module,exports){
/**@jsx*/
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
var type = window.focus.component.types;
var ContextualActions = require("../action-contextual").component;
var CheckBox = require("../../common/input/checkbox").component;
var lineMixin = {
    displayName: "selection-line",
    /**
     * Default properties for the line.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            operationList: []
        };
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("object"),
        isSelection: type("bool"),
        isSelected: type("bool"),
        onLineClick: type("func"),
        onSelection: type("func"),
        operationList: type("array")
    },

    /**
     * State initialization.
     * @returns {{isSelected: boolean, lineItem: *}}
     */
    getInitialState: function getLineInitialState() {
        return {
            isSelected: this.props.isSelected || false
        };
    },

    /**
     * Update properties on component.
     * @param nextProps next properties
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.isSelected !== undefined) {
            this.setState({ isSelected: nextProps.isSelected });
        }
    },

    /**
     * Get the line value.
     * @returns {{item: *, isSelected: (*|isSelected|boolean)}}
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data,
            isSelected: this.state.isSelected
        };
    },

    /**
     * Selection Click handler.
     * @param event
     */
    _handleSelectionClick: function handleSelectionClick(event) {
        var select = !this.state.isSelected;
        this.setState({ isSelected: select });
        if (this.props.onSelection) {
            this.props.onSelection(this.props.data, select);
        }
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event) {
        if (this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * Render the left box for selection
     * @returns {XML}
     */
    _renderSelectionBox: function renderSelectionBox() {
        if (this.props.isSelection) {
            var selectionClass = this.state.isSelected ? "selected" : "no-selection";
            //var image = this.state.isSelected? undefined : <img src={this.state.lineItem[this.props.iconfield]}/>
            return React.createElement(
                "div",
                { className: "sl-selection " + selectionClass },
                React.createElement(CheckBox, { value: this.state.isSelected, onChange: this._handleSelectionClick })
            );
        }
        return null;
    },

    /**
     * render content for a line.
     * @returns {*}
     */
    _renderLineContent: function renderLineContent() {
        if (this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        } else {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    this.props.data.title
                ),
                React.createElement(
                    "div",
                    null,
                    this.props.data.body
                )
            );
        }
    },

    /**
     * Render actions wich can be applied on the line
     */
    _renderActions: function renderLineActions() {
        if (this.props.operationList.length > 0) {
            return React.createElement(
                "div",
                { className: "sl-actions" },
                React.createElement(ContextualActions, { operationList: this.props.operationList, operationParam: this.props.data })
            );
        }
    },

    /**
     * Render line in list.
     * @returns {*}
     */
    render: function renderLine() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                "li",
                { className: "sl-line" },
                this._renderSelectionBox(),
                React.createElement(
                    "div",
                    { className: "sl-content", onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

module.exports = { mixin: lineMixin };

},{"../../common/input/checkbox":4,"../action-contextual":6}],9:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Line = require("./line").mixin;
var Button = require("../../common/button/action").component;
var type = window.focus.component.types;
var InfiniteScrollMixin = require("./infinite-scroll").mixin;

var listMixin = {
    mixins: [InfiniteScrollMixin],
    /**
     * Display name.
     */
    displayName: "selection-list",

    /**
     * Default properties for the list.
     * @returns {{isSelection: boolean}} the default properties
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            isAllSelected: false,
            selectionStatus: "partial",
            isLoading: false,
            hasMoreData: false,
            operationList: [],
            isManualFetch: false,
            idField: "id"
        };
    },

    /**
     * list property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("array"),
        isSelection: type("bool"),
        isAllSelected: type("bool"),
        onSelection: type("func"),
        onLineClick: type("func"),
        isLoading: type("bool"),
        loader: type("func"),
        FetchNextPage: type("func"),
        operationList: type("array"),
        isManualFetch: type("bool"),
        idField: type("string")
    },

    /**
     * Return selected items in the list.
     * @return {Array} selected items
     */
    getSelectedItems: function getListSelectedItems() {
        var selected = [];
        for (var i = 1; i < this.props.data.length + 1; i++) {
            var lineName = "line" + i;
            var lineValue = this.refs[lineName].getValue();
            if (lineValue.isSelected) {
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*}
     */
    fetchNextPage: function fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param {object} event event received
     */
    _handleShowMore: function handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    },

    /**
     * Render lines of the list.
     * @returns {*} DOM for lines
     */
    _renderLines: function renderLines() {
        var _this = this;

        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map(function (line) {
            var isSelected;
            switch (_this.props.selectionStatus) {
                case "none":
                    isSelected = false;
                    break;
                case "selected":
                    isSelected = true;
                    break;
                case "partial":
                    isSelected = undefined;
                    break;
                default:
                    isSelected = false;
            }
            return React.createElement(LineComponent, {
                key: line[_this.props.idField],
                data: line,
                ref: "line" + lineCount++,
                isSelection: _this.props.isSelection,
                isSelected: isSelected,
                onSelection: _this.props.onSelection,
                onLineClick: _this.props.onLineClick,
                operationList: _this.props.operationList
            });
        });
    },
    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                "li",
                { className: "sl-loading" },
                "Loading ..."
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: "primary" };
            return React.createElement(
                "li",
                { className: "sl-button" },
                React.createElement(Button, { label: "list.selection.button.showMore",
                    type: "button",
                    handleOnClick: this._handleShowMore,
                    style: style })
            );
        }
    },

    /**
     * Render the list.
     * @returns {XML} DOM of the component
     */
    render: function renderList() {
        return React.createElement(
            "ul",
            { className: "selection-list" },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);

},{"../../common/button/action":2,"./infinite-scroll":7,"./line":8}]},{},[1])(1)
});