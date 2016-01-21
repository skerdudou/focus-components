// Dependencies
import React, {PropTypes} from 'react';
import {keys} from 'lodash/object';

// Components
import {component as FacetData} from './facet-data';

const propTypes = {
    nbDefaultDataList: PropTypes.number
};

const defaultProps = {
    nbDefaultDataList: 6
};

@ComponentBaseBehaviour
class Facet extends Component {
    constructor(props) {
        super(props);
        const state = {
            isShowAll: false
        };
        this.state = state;
    };

    /**
     * Render the component.
     * @returns {XML} Html component code.
     */
    render() {
        let className = 'facet';
        const {isExpanded, selectedDataKey} = this.props;
        if (selectedDataKey) {
            className += '-selected';
        } else if (isExpanded) {
            className += '-expanded';
        } else {
            className += '-collapsed';
        }
        return (
            <div className={className} data-focus='facet'>
                {this._renderFacetTitle()}
                {this._renderFacetDataList()}
            </div>
        );
    };

    /**
     * Render the component title.
     * @returns {XML} Html component code.
     */
    _renderFacetTitle() {
        const {facet, facetKey, selectedDataKey} = this.props;
        let title = this.i18n('live.filter.facets.' + facetKey); // Default facet translation path is live.filter.facets.
        if (selectedDataKey) {
            title += ' : ' + facet[selectedDataKey].label;
        }
        return (
            <div data-focus='facet-title' onClick={this._facetTitleClickHandler}>
                <h3>{title}</h3>
            </div>
        );
    };

    /**
     * Action on facet title click.
     */
    _facetTitleClickHandler() {
        const {facetKey, expandHandler, isExpanded, selectedDataKey} = this.props;
        expandHandler(facetKey, !isExpanded);
        if (selectedDataKey) {
            selectHandler(facetKey, undefined, undefined);
        }
        this.setState({
            isExpanded: !isExpanded,
            isShowAll: false
        });
    };

    /**
     * Render the list of data of the facet.
     * @returns {XML} Html component code.
     */
    _renderFacetDataList() {
        const {facet, isExpanded, isShowAll, nbDefaultDataList, selectedDataKey, type} = this.props;
        if (!isExpanded || selectedDataKey) {
            return '';
        }
        let keysList = this.state.isShowAll ? keys(facet) : keys(facet).slice(0, nbDefaultDataList);
        return (
            <div data-focus='facet-data-list'>
                <ul>
                    {keysList.map((key) => {
                        return (
                            <li key={key}>
                                <FacetData dataKey={key} data={facet[key]} selectHandler={this._facetDataSelectionHandler}
                                    type={type}/>
                            </li>
                        );
                    })}
                </ul>
                <div data-focus="facet-data-show-all">
                    {this._renderShowAllDataList()}
                </div>
            </div>);
    };

    /**
     * Action on facet data selection.
     * @param {string} dataKey Key of the selected data.
     * @param {string} data Selected data.
     */
    _facetDataSelectionHandler(dataKey, data) {
        const {expandHandler, facetKey, selectHandler} = this.props;
        expandHandler(facetKey, false);
        selectHandler(facetKey, dataKey, data);
    };

    /**
     * Render all the data facets.
     * @returns {XML} Html component code.
     */
    _renderShowAllDataList() {
        const {facet, nbDefaultDataList} = this.props;
        const {isShowAll} = this.state;
        if (!isShowAll && Object.keys(facet).length > nbDefaultDataList) {
            return (
                <a href='javascript:void(0);' data-focus='facet-show-all' onClick={this._showAllHandler}>
                    {this.i18n('show.all')}
                </a>
            );
        }
    };

    /**
     * Action on 'show all' action.
     */
    _showAllHandler() {
        const {isShowAll} = this.state;
        this.setState({isShowAll: !isShowAll});
    };
};

//Static props.
Facet.displayName = 'Facet';
Facet.defaultProps = defaultProps;
Facet.propTypes = propTypes;

export default Facet;
