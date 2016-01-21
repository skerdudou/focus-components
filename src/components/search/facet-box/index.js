// Dependencies
import React, {PropTypes} from 'react';
import {omit} from 'lodash/object';

//components
import Facet from './facet';

const propTypes = {
    facetList: PropTypes.object,
    selectedFacetList: PropTypes.object,
    openedFacetList: PropTypes.object,
    config: PropTypes.object,
    dataSelectionHandler: PropTypes.func
};

const defaultProps = {
    facetList: {},
    selectedFacetList: {},
    openedFacetList: {},
    config: {}
};

@ComponentBaseBehaviour
class FacetBox extends Component {
    constructor(props) {
        super(props);
        const state = {
            isExpanded: true,
            openedFacetList: []
        };
        this.state = state;
    };

    /**
     * New properties set event handle
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        let {openedFacetList} = nextProps;
        const {facetList} = nextProps;
        if (Object.keys(openedFacetList).length == 0) {
            openedFacetList = this._generateOpenedFacetList(facetList);
        }
        this.setState({openedFacetList});
    };

    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render() {
        const {isExpanded} = this.state;
        const className = isExpanded ? ' expanded' : ' collapsed';
        return (
            <div className={`${this._getStyleClassName() + className}`} data-focus='facet-box2'>
                {this._renderFacetBoxTitle()}
                {this._renderFacetList()}
            </div>
        );
    };

    _generateOpenedFacetList(facetList) {
        return Object.keys(facetList).reduce(function (list, facetKey) {
            list[facetKey] = true;
            return list;
        }, {});
    };

    /**
     * Render the div title of the component.
     * @returns {XML} Html content.
     */
    _renderFacetBoxTitle() {
        const title = this.state.isExpanded ? this.i18n('live.filter.title') : '';
        //TODO onClick={this._facetBoxTitleClickHandler} (le repli doit aussi etre porté par le data-focus=advanced-search
        return (
            <div data-focus="facet-box-heading" onClick={this._facetBoxTitleClickHandler}>
                <h2>{title}</h2>
            </div>
        );
    };

    /**
     * Render the list of the facets.
     * @returns {XML} Html content.
     */
    _renderFacetList() {
        const {isExpanded, openedFacetList} = this.state;
        const {config, facetList, selectedFacetList} = this.props;
        if (!isExpanded) {
            return null;
        }
        return (
            <div data-focus="facet-box-body">
                {Object.keys(facetList).map((facetKey) => {
                    let facet = facetList[facetKey];
                    let selectedDataKey = selectedFacetList[facetKey] ? selectedFacetList[facetKey].key : undefined;
                    if (selectedDataKey || Object.keys(facet).length > 1) {
                        return (
                            <Facet  facetKey={facetKey}
                                    key={facetKey}
                                    facet={facet}
                                    selectedDataKey={selectedDataKey}
                                    isExpanded={openedFacetList[facetKey]}
                                    expandHandler={this._facetExpansionHandler}
                                    selectHandler={this._facetSelectionHandler}
                                    type={config[facetKey]}
                                />
                        );
                    }
                })}
            </div>
        );
    };

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    _facetBoxTitleClickHandler() {
        const {isExpanded} = this.state;
        this.setState({isExpanded: !isExpanded});
    };

    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    _facetSelectionHandler(facetKey, dataKey, data) {
        const {dataSelectionHandler, selectedFacetList} = this.props;
        const {openedFacetList} = this.state;
        const result = {openedFacetList: openedFacetList};
        if (dataKey == undefined) {
            result.selectedFacetList = omit(selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(selectedFacetList, {[facetKey]: {key: dataKey, data: data}});
        }
        dataSelectionHandler(result);
    };

    /**
     * Expand facet action handler.
     * @param {string} facetKey Key of the facet.
     * @param {string} isExpanded true if expand action, false if collapse action.
     */
    _facetExpansionHandler(facetKey, isExpanded) {
        const {openedFacetList} = this.state;
        openedFacetList[facetKey] = isExpanded;
        this.setState({openedFacetList: openedFacetList});
    }
};

//Static props.
FacetBox.displayName = 'FacetBox';
FacetBox.defaultProps = defaultProps;
FacetBox.propTypes = propTypes;

export default FacetBox;
