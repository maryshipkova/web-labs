import React from 'react';
import {Bookmarks} from "../src/Bookmarks/Bookmarks";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import App from "../src/App";

beforeAll(()=>{
    console.error = jest.fn();
    window.fetch = jest.fn(()=>Promise.resolve());
});

it('App', () => {
    const initialState={cities: ["Moscow","1234","12345"]};
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    let tree;
    renderer.act(() => {
        tree = renderer
            .create(
                <Provider store={store}>
                    <App/>
                </Provider>);
    });

    expect(tree.toJSON()).toMatchSnapshot();
});
