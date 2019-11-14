import React from 'react';
import renderer from 'react-test-renderer';
import {Weather} from "../src/Weather/Weather";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

describe()
it('Weather', () => {
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

it('Weather Main', () => {
    const initialState={cities: ["Moscow","1234","12345"]};
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const weatherInfo = {error:'test'};
    const tree = renderer
        .create(
            <Provider store={store}>
                <Weather main weatherInfo={weatherInfo}/>
            </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Weather 404', () => {
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

it('Weather w/o data', () => {
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

