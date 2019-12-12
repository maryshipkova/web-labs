import * as React from 'react';
import { useDispatch } from "react-redux";
import { getCityData } from "../store/actions";
import './Weather.scss';


export const Weather = (props) => {
    let [weatherInfo, updateWeatherInfo] = React.useState({});
    //monkey patching
    if(props.weatherInfo){
        weatherInfo =  props.weatherInfo;
    }


    const [loading, isLoading] = React.useState(false);
    const dispatch = useDispatch();
    const {city, coordinates, main, onRemove} = props;

    React.useEffect(() => {
        if (city || coordinates) {
            isLoading(true);
            getCityData(dispatch, city, coordinates).then(data => {
                if(!data || !data.list) return Promise.reject('404: city not found');

                const currWeather = data.list[0];
                updateWeatherInfo({
                    cityName: data.city.name,
                    coord: [data.city.coord.lat, data.city.coord.lon],
                    humidity: `${currWeather.main.humidity} %`,
                    pressure: `${currWeather.main.pressure} hPa`,
                    wind: `${currWeather.wind.speed} meter/sec`,
                    weather: currWeather.weather[0].description,
                    temperature: `${parseInt((currWeather.main.temp - 272) + '')} C`,
                    icon: currWeather.weather[0].icon
                });
                isLoading(false);
            }).catch(e => {
                isLoading(false);
                return updateWeatherInfo({city, error: e.toString()});
            });
        }
    }, [city, coordinates, dispatch]);


    if (loading) return <div>loading</div>;
    if (weatherInfo.error && city) {
        setTimeout(()=>onRemove(city), 2000);

        return (
            <div>
                {city}: {weatherInfo.error}
            </div>);
    }

    const {cityName, temperature, wind, weather, pressure, humidity, coord, icon} = weatherInfo;
    return (
        <div className={`Weather${main ? ' Weather_main' : ''}`}>
            {weatherInfo && weatherInfo.cityName ?
                <React.Fragment>
                    <div className="Weather-General">
                        <h1 className="Weather-City">{cityName}</h1>
                        <div className="Weather-MainInfo">
                            <div className="Weather-Icon">
                                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={icon}/>
                            </div>
                            <h2 className="Weather-Temperature">{temperature}</h2>
                        </div>
                        {!main && <button className={'Weather-Button'} onClick={() => onRemove(city)}>&Chi;</button>}
                    </div>
                    <ul className="Weather-List">
                        <li className="Weather-Item">Ветер: {wind}</li>
                        <li className="Weather-Item">Облачность: {weather}</li>
                        <li className="Weather-Item">Давление: {pressure}</li>
                        <li className="Weather-Item">Влажность: {humidity}</li>
                        <li className="Weather-Item">Координаты: {coord && `${coord[0]} ${coord[1]}`}</li>
                    </ul>
                </React.Fragment> : null}
        </div>
    )
};
