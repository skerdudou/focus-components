const ReactDOM = require('react-dom');

const Material = (ref, watchedProp: 'error') => Component => class MaterialComponent extends Component {
    componentDidMount() {
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.upgradeElement(refNode);
        }
        if (Component.prototype.componentDidMount) {
            Component.prototype.componentDidMount.call(this);
        }
    }

    componentWillUnmount() {
        const refNode = ReactDOM.findDOMNode(this.refs[ref]);
        if (refNode) {
            componentHandler.downgradeElements(refNode);
        }
        if (Component.prototype.componentWillUnmount) {
            Component.prototype.componentWillUnmount.call(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        const newWatchedProp = nextProps[watchedProp];
        if (newWatchedProp !== this.props[watchedProp]) {
            const refNode = ReactDOM.findDOMNode(this.refs[ref]);
            componentHandler.upgradeElement(refNode);
        }
        if (Component.prototype.componentWillReceiveProps) {
            Component.prototype.componentWillReceiveProps.call(this, nextProps);
        }
    }
};

export default Material;
