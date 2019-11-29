import {baseUrl} from "../store/actions";

export function getCitiesFromStorage() {
    return fetch(`${baseUrl}/favourites`)
        .then(data => data).then(res => {
            if(res.status > 400){
                return {error: res.status}
            }
            return res.json();
        })

        .catch(error =>{
            return {error}
    });
}

export function addCityToStorage(city) {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({city})
    };

    return fetch(`${baseUrl}/favourites`, params)
        .then(getCitiesFromStorage)
}

export function removeCityFromStorage(city) {
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({city})
    };

    return fetch(`${baseUrl}/favourites`, params)
        .then(getCitiesFromStorage)
}
