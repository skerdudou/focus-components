// Dependencies
import React, {PropTypes} from 'react';
import ArgumentInvalidException from 'focus-core/exception/argument-invalid-exception';
import numberFormatter from 'focus-core/definition/formatter/number';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: 'text'
};

@ComponentBaseBehaviour
class FacetData extends Component {
    /**
     * Render the component.
     * @returns {XML} Html code of the component.
     */
    render() {
        return(
            <div data-focus='facet-data' onClick={this._selectFacetData}>
                {this._renderData()}
            </div>
        );
    };

    /**
     * Render the data.
     * @returns {string} Html generated code.
     */
    _renderData() {
        const {data, type} = this.props;
        if(type == 'text') {
            return `${data.label} (${numberFormatter.format(data.count)})`;
        }
        throw new ArgumentInvalidException('Unknown property type : ' + type);
    };

    /**
     * Facet selection action handler.
     * @returns {function} the facet selection handler.
     */
    _selectFacetData() {
        const {data, dataKey, selectHandler} = this.props;
        return selectHandler(dataKey, data);
    };
};

//Static props.
FacetData.displayName = 'FacetData';
FacetData.defaultProps = defaultProps;
FacetData.propTypes = propTypes;

export default FacetData;
