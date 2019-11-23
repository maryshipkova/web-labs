import React from 'react';
import renderer from 'react-test-renderer';
import {Weather} from "../src/Weather/Weather";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

describe('Weather', ()=>{
    beforeAll(()=>{
        window.fetch = jest.fn(()=>Promise.resolve());
    });

    it('plain', () => {
        const initialState={cities: ["Moscow","1234","12345"]};
        const mockStore = configureStore([thunk]);
        const store = mockStore(initialState);
        const weatherInfo = {
            cityName: "Moscow",
            coord: (2) [55.7507, 37.6177],
            humidity: "77 %",
            icon: "04n",
            pressure: "1030 hPa",
            temperature: "3 C",
            weather: "overcast clouds",
            wind: "4.2 meter/sec"
        };
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Weather weatherInfo={weatherInfo}/>
                </Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Main mod', () => {
        const initialState={cities: ["Moscow","1234","12345"]};
        const mockStore = configureStore([thunk]);
        const store = mockStore(initialState);
        const weatherInfo = {
            cityName: "Moscow",
            coord: (2) [55.7507, 37.6177],
            humidity: "77 %",
            icon: "04n",
            pressure: "1030 hPa",
            temperature: "3 C",
            weather: "overcast clouds",
            wind: "4.2 meter/sec"
        };
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Weather main weatherInfo={weatherInfo}/>
                </Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('404', () => {
        const initialState={cities: ["Moscow","1234","12345"]};
        const mockStore = configureStore([thunk]);
        const store = mockStore(initialState);
        const weatherInfo = {city:'1', error: '404 city not found'};
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Weather weatherInfo={weatherInfo}/>
                </Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Weather no data', () => {
        const initialState={cities: ["Moscow","1234","12345"]};
        const mockStore = configureStore([thunk]);
        const store = mockStore(initialState);
        const weatherInfo = {

        };
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Weather weatherInfo={weatherInfo}/>
                </Provider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

