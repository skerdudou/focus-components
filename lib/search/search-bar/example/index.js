//Components
'use strict';

var SearchBar = FocusComponents.search.searchBar.component;

//stores
var store = Focus.search.builtInStore.quickSearchStore;

var action = {
    updateProperties: function updateProperties(props) {
        return alert('Cette action a lancé une recherche et vous avez choisi le scope "' + props.scope + '".');
    }
};

//data
var scopes = [{
    code: 'face',
    label: 'Utilisateurs'
}, {
    code: 'extension',
    label: 'Extensions'
}, {
    code: 'contact_phone',
    label: 'Contacts'
}];

//config
Focus.reference.config.set({
    scopes: function scopes() {
        return new Promise(function (success) {
            success([{
                code: 'SCP1',
                label: 'Scope 1'
            }, {
                code: 'SCP2',
                label: 'Scope 2'
            }, {
                code: 'SCP3',
                label: 'Scope 3'
            }]);
        });
    }
});

Focus.reference.builtInAction(['scopes'])();

var SearchBarExample = React.createClass({
    displayName: 'SearchBarExample',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Search bar with scope'
            ),
            React.createElement(SearchBar, { scopes: scopes, store: store, action: action }),
            React.createElement(
                'h3',
                null,
                'Search bar without scope'
            ),
            React.createElement(SearchBar, { scopes: scopes, store: store, hasScopes: false })
        );
    }
});

return React.createElement(SearchBarExample, null);