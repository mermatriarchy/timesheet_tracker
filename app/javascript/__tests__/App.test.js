import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../components/App';

Enzyme.configure({ adapter: new Adapter()});

/*
 * This is more of a gesture at front-end testing than an actual
 * working front-end test suite. The render test fails out here because
 * of the Bootstrap import, so I'd need to configure some 'transform'
 * rules in my Babel config file.
*/

describe('App Component', () => {
    it('App renders correctly', () => {  
        const AppComponent = renderer.create(<App/>).toJSON();
        expect(AppComponent).toMatchSnapshot();
    });

    describe('when the table is updated', () => {
        // expect handleNewEntry to be triggered
        // an API call is made
        // expect call to be success
    })
})
