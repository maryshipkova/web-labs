import {actions} from "./actions";

export function bookmarksReducer(state = {cities: []}, action) {

    switch(action.type) {
        case actions.ADD:
            console.info(`${actions.ADD} payload: ${action.payload}`);

            return {
                ...state,
                cities:[...state.cities, action.payload]
            };

        case actions.REMOVE:
            console.info(`${actions.REMOVE} payload: ${action.payload}`);

            return {
                ...state,
                cities:state.cities.filter(city => city !== action.payload)
            };

        default:
            return state;
    }
}
