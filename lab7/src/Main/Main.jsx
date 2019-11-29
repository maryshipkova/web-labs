import React from 'react';
import {Weather} from "../Weather/Weather";
import {Bookmarks} from "../Bookmarks/Bookmarks";
import {useDispatch, useSelector} from "react-redux";
import './Main.scss'
import {getCities, remove} from "../store/actions";

export const Main = (props) => {
    const [coordinates, updateCoordinates] = React.useState();
    const [loading, isLoading] = React.useState(false);
    const cities = useSelector(state => {
        if( state.cities.error ) return {error: state.cities.error}
        return state.cities.map(cityObj => cityObj.city)
    });

    const dispatch = useDispatch();

    React.useEffect(()=>{
        (async function f() {
            await getCities(dispatch)
        })();
    }, [dispatch]);

    const onButtonClick = () => {
        isLoading(true);

        navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                updateCoordinates({lat: latitude, lon: longitude});
                isLoading(false);
            },
            function (err) {
                updateCoordinates({lat: '59', lon: '30'});
                isLoading(false);
            }, {
                maximumAge:1
            });

    };

    const onRemove = (city) => {
        remove(dispatch, city);
    };

    const renderCities = () =>{
        return cities.error? <div key={'error'}>error: {cities.error.toString()}</div>:
             cities.map((city, i) => <Weather id={city} city={city} key={`city_${i}`} onRemove={onRemove}/>)
    };

    return (
        <main className={'Main'}>
            <div className="Main-Search">
                <h3>Погода здесь</h3>
                <button className="Main-Button" onClick={onButtonClick}>Обновить геолокацию</button>
            </div>
            {
                props.loading || loading ? <div>loading</div> :
                    <Weather main coordinates={coordinates}/>
            }
            <div className={'Main-Bookmarks'}>
                <Bookmarks/>
                {
                    cities? renderCities(): null
                }
            </div>
        </main>
    )
};
