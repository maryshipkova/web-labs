import React from 'react';
import {Bookmarks} from "../src/Bookmarks/Bookmarks";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Weather} from "../src/Weather/Weather";
import {Main} from "../src/Main/Main";
import App from "../src/App";

it('App', () => {
    const initialState={cities: ["Moscow","1234","12345"]};
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const tree = renderer
        .create(
            <Provider store={store}>
                <App/>
            </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
