import * as React from 'react';
import './Weather.scss';

const getData = (city, coordinates) => {
    const fetchUrl = city ? `q=${city}` : `lat=${coordinates.lat}&lon=${coordinates.lon}`;

    return fetch(`http://api.openweathermap.org/data/2.5/forecast?${fetchUrl}&APPID=62462c93c650ac75e405b900f2457d73`)
        .then(data => data.json())
};

export const Weather = (props) => {
    const [weatherInfo, updateWeatherInfo] = React.useState({});
    const [loading, isLoading] = React.useState(false);

    const getCityData = (city) => {
        return getData(city, coordinates)
            .then(data => {
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
            })
            .catch(e => {
                isLoading(false);
                return updateWeatherInfo({city, error: '404 city not found'});
            })
    };

    const {city, coordinates, main, onRemove} = props;

    React.useEffect(() => {
        if (city || coordinates) {
            isLoading(true);
            getCityData(city, coordinates);
        }
    }, [city, coordinates]);


    if(loading) return <div>loading</div>;
    if (weatherInfo.error){
        return (
            <div>
                {city}: {weatherInfo.error}
                <button className={'Weather-Remove'} onClick={() => onRemove(city)}>&Chi;</button>
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
