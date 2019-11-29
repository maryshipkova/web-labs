import {addCityToStorage, getCitiesFromStorage, removeCityFromStorage} from "../utils/localStorage";

export const baseUrl = 'http://localhost:8000';

export const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    FETCH: 'FETCH',
    GET_CITIES: 'GET_CITIES'
};

export async function add (dispatch, city){
    dispatch({
        type: actions.ADD,
        payload: await addCityToStorage(city)
    })
}

export async function remove (dispatch, city) {
    dispatch({
        type: actions.REMOVE,
        payload: await removeCityFromStorage(city)
    })
}

export async function getCities(dispatch) {
    dispatch({
        type: actions.GET_CITIES,
        payload: await getCitiesFromStorage()
    });

}

const fetchData = (city, coordinates) => {
    if(city){
        return fetch(`${baseUrl}/weather?city=${city}`)
            .then(data => data.json())
    }else{
        return fetch(`${baseUrl}/weather/coordinates?lat=${coordinates.lat}&lon=${coordinates.lon}`)
            .then(data => data.json())
    }
};

export const getCityData = (dispatch, city, coordinates) => {
    dispatch({
        type: actions.FETCH,
        payload: city
    });
    return fetchData(city, coordinates);
};
