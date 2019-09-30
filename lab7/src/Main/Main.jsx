import React from 'react';
import {Weather} from "../Weather/Weather";
import './Main.scss'

export class Main extends React.PureComponent{

    onButtonClick(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                // var latitude = position.coords.latitude;
                // var longitude = position.coords.longitude;
                console.log(position);
            });
        };
    }

    render(){
        // избранное в localStorage
        return (
        <main className={'Main'}>
            <div className="Main-Search">
                <h3>Погода здесь</h3>
                <button className="Main-Button" onClick={this.onButtonClick}>Обновить геолокацию</button>
            </div>
            <Weather city={'Saint-Peterburg'}/>
            <div className={'Main-Bookmarks Bookmarks'}>
                <div className={'Bookmarks-Row'}>
                    <h3 className={'Bookmarks-Title'}>Избранное</h3>
                    <div className={'Bookmarks-Add'}>
                        <input type="text" placeholder={'Добавить новый город'}/>
                    </div>
                </div>
                <Weather city={'Moscow'}/>
                <Weather city={'Helsinki'}/>
            </div>
        </main>
        )
    }
}
