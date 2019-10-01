import {actions} from "./actions";

export function bookmarksReducer(state = {cities: []}, action) {

    switch(action.type) {
        case actions.ADD:
            return {
                ...state,
                cities:[...state.cities, action.payload]
            };

        case actions.REMOVE:
            return {
                ...state,
                cities:state.cities.filter(city => city !== action.payload)
            };

        default:
            return state;
    }
}
