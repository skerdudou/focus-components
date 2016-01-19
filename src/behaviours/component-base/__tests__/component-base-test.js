import ComponentBaseBehaviour from '../';
import React from 'react';
import ReactDOM from 'react-dom';
import {translate, init} from 'focus-core/translation';

describe('The component base behaviour', () => {
    let renderedComponent;
    before((done) => {
        init({resStore: {}}, () => {
            @ComponentBaseBehaviour
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div>
                            {translate('my.translation.path')}
                        </div>
                    );
                }
            }
            renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
            done();
        });
    });
    it('should add at least the translation function to the provided component', () => {
        const child = TestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');
        expect(ReactDOM.findDOMNode(child).innerHTML).to.equal('my.translation.path');
    });
});
