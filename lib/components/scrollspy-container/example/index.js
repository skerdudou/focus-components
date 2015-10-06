'use strict';

var ScrollspyContainer = FocusComponents.components.ScrollspyContainer;
var Panel = FocusComponents.components.Panel;

var headerHeigth = 100;

var headerStyles = {
    backgroundColor: '#FFF',
    position: 'fixed',
    top: 0,
    left: 0,
    width: 100 + '%',
    height: headerHeigth + 'px',
    zIndex: 1000,
    textAlign: 'center'
};

var ScrollspyContainerSample = React.createClass({
    displayName: 'ScrollspyContainerSample',

    getInitialState: function getInitialState() {
        return {
            isConditionalBlock: false
        };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        setTimeout(function () {
            _this.setState({ isConditionalBlock: true });
        }, 3 * 1000);
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        var isConditionalBlock = this.state.isConditionalBlock;

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { style: headerStyles },
                React.createElement(
                    'h1',
                    null,
                    'header'
                )
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                ScrollspyContainer,
                { offset: headerHeigth + 10 },
                React.createElement(
                    Panel,
                    { title: 'Sports' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/sports', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Animals' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/animals', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Business' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/business', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Cats' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/cats', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'City' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/city', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Food' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/food', title: 'lorempixel' })
                ),
                isConditionalBlock && React.createElement(
                    Panel,
                    { title: 'Conditionnal block' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/food', title: 'lorempixel' }),
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/business', title: 'lorempixel' }),
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/city', title: 'lorempixel' }),
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/animals', title: 'lorempixel' }),
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/sports', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Nightlife' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/nightlife', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Fashion' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/fashion', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'People' },
                    React.createElement('img', { alt: 'lorempixel', src: 'http://lorempixel.com/800/600/people', title: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Nature' },
                    React.createElement('img', { src: 'http://lorempixel.com/800/600/nature', title: 'lorempixel', alt: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Technics' },
                    React.createElement('img', { src: 'http://lorempixel.com/800/600/technics', title: 'lorempixel', alt: 'lorempixel' })
                ),
                React.createElement(
                    Panel,
                    { title: 'Transport' },
                    React.createElement('img', { src: 'http://lorempixel.com/800/600/transport', title: 'lorempixel', alt: 'lorempixel' })
                )
            )
        );
    }
});

return React.createElement(ScrollspyContainerSample, null);