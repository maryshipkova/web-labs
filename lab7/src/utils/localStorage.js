export function addCityToStorage(city) {
    const cities = window.localStorage.getItem('cities').split(',') || [];
    if(!cities.find(c => c===city))cities.push(city);
    window.localStorage.setItem('cities', cities);
    return cities;
}

export function removeCityFromStorage(city) {
    const cities = window.localStorage.getItem('cities').split(',').filter(c => c!==city) || [];
    window.localStorage.setItem('cities', cities);
    console.log(window.localStorage)
    return cities;

}

export function getCitiesFromStorage() {
    return window.localStorage.getItem('cities').split(',') || [];
}
