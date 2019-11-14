import React from 'react';
import {Bookmarks} from "../src/Bookmarks/Bookmarks";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

it('Bookmarks', () => {
    const initialState={cities: ["Moscow","1234","12345"]};
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const tree = renderer
        .create(
            <Provider store={store}>
                <Bookmarks/>
            </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
