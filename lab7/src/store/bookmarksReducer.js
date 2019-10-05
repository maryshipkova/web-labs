import {actions} from "./actions";
import {addCityToStorage, getCitiesFromStorage, removeCityFromStorage} from "../utils/localStorage";

export function bookmarksReducer(state = {cities: getCitiesFromStorage()}, action) {

    switch(action.type) {
        case actions.ADD:
            console.info(`${actions.ADD} payload: ${action.payload}`);

            return {
                cities:addCityToStorage(action.payload)
            };

        case actions.REMOVE:
            console.info(`${actions.REMOVE} payload: ${action.payload}`);

            return {
                cities:removeCityFromStorage(action.payload)
            };

        default:
            return state;
    }
}
