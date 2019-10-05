import React from 'react';
import {Weather} from "../Weather/Weather";
import {Bookmarks} from "../Bookmark/Bookmarks";
import {useDispatch, useSelector} from "react-redux";
import './Main.scss'
import {remove} from "../store/actions";

export const Main = () => {
    const [coordinates, updateCoordinates] = React.useState();
    const [loading, isLoading] = React.useState(false);
    const cities = useSelector(state => state.cities);
    const dispatch = useDispatch();
    const onButtonClick = () => {
        isLoading(true);
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateCoordinates({lat: latitude, lon: longitude});
            isLoading(false);
        });

    };

    const onRemove = (city) => {
        remove(dispatch, city);
    };

    return (
        <main className={'Main'}>
            <div className="Main-Search">
                <h3>Погода здесь</h3>
                <button className="Main-Button" onClick={onButtonClick}>Обновить геолокацию</button>
            </div>
            {
                loading ? <div>loading</div> :
                    <Weather main coordinates={coordinates}/>
            }
            <div className={'Main-Bookmarks'}>
                <Bookmarks/>
                {
                    cities && cities.map(city => <Weather id={city} city={city} onRemove={onRemove}/>)
                }
            </div>
        </main>
    )
};
