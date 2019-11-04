import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import {createStore, applyMiddleware} from 'redux'
import {bookmarksReducer} from "./store/bookmarksReducer";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

const store = createStore(bookmarksReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
