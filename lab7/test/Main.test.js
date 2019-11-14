import React from 'react';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Main} from "../src/Main/Main";

it('Main', () => {
    const initialState={cities: ["Moscow","1234","12345"]};
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const tree = renderer
        .create(
            <Provider store={store}>
                <Main/>
            </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});


it('Main loading', () => {
    const initialState={cities: ["Moscow","1234","12345"]};
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const tree = renderer
        .create(
            <Provider store={store}>
                <Main/>
            </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
