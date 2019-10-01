import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import {createStore} from 'redux'
import {bookmarksReducer} from "./store/bookmarksReducer";
import {Provider} from "react-redux";

const store = createStore(bookmarksReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
