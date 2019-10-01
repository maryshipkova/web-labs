import React from 'react';
import {Weather} from "../Weather/Weather";
import './Main.scss'
import {Bookmarks} from "../Bookmark/Bookmarks";

export const Main = () =>{
    const [coordinates, updateCoordinates] = React.useState();

    const onButtonClick = ()=> {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                updateCoordinates({lat:latitude, lon:longitude});
            });
        }
    };

        // избранное в localStorage
        return (
        <main className={'Main'}>
            <div className="Main-Search">
                <h3>Погода здесь</h3>
                <button className="Main-Button" onClick={onButtonClick}>Обновить геолокацию</button>
            </div>
            <Weather main coordinates={coordinates}/>
            <div className={'Main-Bookmarks'}>
               <Bookmarks/>
                <Weather city={'Moscow'}/>
                <Weather city={'Helsinki'}/>
            </div>
        </main>
        )
};
