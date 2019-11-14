function getCityData(city) {
    return fetch( `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=62462c93c650ac75e405b900f2457d73`)
        .then(data => data.json())
        .then(data => {
            const currWeather = data.list[0];

            return {
                city: data.city.name,
                coordinates: [data.city.coord.lat,data.city.coord.lon],
                humidity: `${currWeather.main.humidity} %`,
                pressure: `${currWeather.main.pressure} hPa`,
                wind: `${currWeather.wind.speed} meter/sec`,
                weather: currWeather.weather[0].description,
                temperature: `${parseInt(currWeather.main.temp-272)} C`,
            };

        })
        .catch(e =>  {
            return Promise.resolve({city: '404: city not found'})
        })
}


const source = document.getElementById('weather-template').innerHTML;
const template = Handlebars.compile(source);


document.getElementById('submit').addEventListener('submit', async (e) => {
    e.preventDefault();
    getCityData(e.target[0].value)
    .then(context =>{
        console.log('data',context)

        const html = template(context);
        document.getElementById('result').innerHTML = html;
    })
});

