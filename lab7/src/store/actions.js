export const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    FETCH: 'FETCH',
};

export const add = (dispatch, city) => {
    dispatch({
        type: actions.ADD,
        payload: city
    })
};

export const remove = (dispatch, city) => {
    dispatch({
        type: actions.REMOVE,
        payload: city
    })
};

const fetchData = (city, coordinates) => {
    const fetchUrl = city ? `q=${city}` : `lat=${coordinates.lat}&lon=${coordinates.lon}`;

    return fetch(`http://api.openweathermap.org/data/2.5/forecast?${fetchUrl}&APPID=62462c93c650ac75e405b900f2457d73`)
        .then(data => data.json())
};

export const getCityData = (dispatch, city, coordinates) => {
    dispatch({
        type: actions.FETCH,
        payload: city
    });

        return fetchData(city, coordinates);
};
