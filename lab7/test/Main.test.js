import React from 'react';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Main} from "../src/Main/Main";

describe('Main', () =>{
    beforeAll(()=>{
        console.error = jest.fn();
        window.fetch = jest.fn(()=>Promise.resolve());
    });

    it('plain', () => {
        const initialState={cities: ["Moscow","1234","12345"]};
        const mockStore = configureStore([thunk]);
        const store = mockStore(initialState);

        let tree = renderer
            .create(
                <Provider store={store}>
                    <Main />
                </Provider>);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('loading', () => {
        const initialState={cities:[]};
        const mockStore = configureStore([thunk]);
        const store = mockStore(initialState);

        let tree;
        renderer.act(() => {
            tree = renderer
                .create(
                    <Provider store={store}>
                        <Main loading/>
                    </Provider>);
        });

        expect(tree.toJSON()).toMatchSnapshot();
    });
});





// const initialState={cities: ["Moscow","1234","12345"]};
// const mockStore = configureStore([thunk]);
// const store = mockStore(initialState);
// window.fetch = jest.fn(()=>Promise.resolve());
// const tree = shallow(
//             <Provider store={store}>
//                 <Main loading/>
//             </Provider>)
// expect(renderToJson(tree)).toMatchSnapshot();
