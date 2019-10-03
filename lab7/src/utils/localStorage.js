export function getCitiesFromStorage() {
    return (window.localStorage.getItem('cities')|| '').split(',') ;
}
export function addCityToStorage(city) {
    const cities = getCitiesFromStorage() ;
    if(!cities.find(c => c===city))cities.push(city);
    window.localStorage.setItem('cities', cities);
    return cities;
}

export function removeCityFromStorage(city) {
    const cities = getCitiesFromStorage().filter(c => c && c!==city);
    window.localStorage.setItem('cities', cities);
    return cities;
}
