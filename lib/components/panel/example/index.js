"use strict";

var Panel = FocusComponents.components.Panel;
var formMixin = FocusComponents.common.form.mixin;

var domain = {
    "DO_TEXT": {
        style: "do_text",
        type: "text",
        component: "PapaSinge",
        validation: [{
            type: "function",
            value: function value() {
                return false;
            }
        }]
    }
};
Focus.definition.domain.container.setAll(domain);
var entities = {
    "contact": {
        "firstName": {
            "domain": "DO_TEXT",
            "required": false
        }
    }
};
Focus.definition.entity.container.setEntityConfiguration(entities);

var PanelSample1 = React.createClass({
    displayName: "PanelSample1",

    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block without actions"
            ),
            React.createElement(
                Panel,
                { title: "Here is the title" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

var PanelSample2 = React.createClass({
    displayName: "PanelSample2",

    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block with actions (default)"
            ),
            React.createElement(
                Panel,
                { title: "Here is the title", actions: this._renderActions },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

var PanelSample3 = React.createClass({
    displayName: "PanelSample3",

    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block with actions (bottom)"
            ),
            React.createElement(
                Panel,
                { title: "Here is the title", actions: this._renderActions, actionsPosition: "bottom" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

var PanelSample4 = React.createClass({
    displayName: "PanelSample4",

    definitionPath: 'contact',
    mixins: [formMixin],
    /**
    * Render the component.
    * @return {object} React node
    */
    renderContent: function renderContent() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Block with actions (both)"
            ),
            React.createElement(
                Panel,
                { title: "Here is the title", actions: this._renderActions, actionsPosition: "both" },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "p",
                    null,
                    "Here is the content."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            )
        );
    }
});

return React.createElement(
    "div",
    null,
    React.createElement(PanelSample1, { hasLoad: false }),
    React.createElement("br", null),
    React.createElement(PanelSample2, { hasLoad: false }),
    React.createElement("br", null),
    React.createElement(PanelSample3, { hasLoad: false }),
    React.createElement("br", null),
    React.createElement(PanelSample4, { hasLoad: false })
);