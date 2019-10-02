import React, {useReducer} from 'react';
import {Weather} from "../Weather/Weather";
import {Bookmarks} from "../Bookmark/Bookmarks";
import {useSelector} from "react-redux";
import './Main.scss'
import {actions} from "../store/actions";
import {bookmarksReducer} from "../store/bookmarksReducer";

export const Main = () => {
    const [coordinates, updateCoordinates] = React.useState();
    const cities = useSelector(state => state.cities);
    const [state, dispatch] = useReducer(bookmarksReducer, {cities});

    const onButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                updateCoordinates({lat: latitude, lon: longitude});
            });
        }
    };

    const onRemove = (city) => {
        dispatch({type: actions.REMOVE, payload:city})
    };

    return (
        <main className={'Main'}>
            <div className="Main-Search">
                <h3>Погода здесь</h3>
                <button className="Main-Button" onClick={onButtonClick}>Обновить геолокацию</button>
            </div>
            <Weather main coordinates={coordinates}/>
            <div className={'Main-Bookmarks'}>
                <Bookmarks/>
                {
                    state && state.cities.map(city => <Weather city={city} onRemove={onRemove}/>)
                }
            </div>
        </main>
    )
};
