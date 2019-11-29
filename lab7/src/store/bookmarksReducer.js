import {actions} from "./actions";

export function bookmarksReducer(state = {cities: []}, action) {

    switch(action.type) {
        case actions.ADD:
            console.info(`${actions.ADD} payload: ${JSON.stringify(action.payload)}`);

            return {
                cities: action.payload
            };

        case actions.REMOVE:
            console.info(`${actions.REMOVE} payload: ${JSON.stringify(action.payload)}`);

            return {
                cities:  action.payload
            };

        case actions.GET_CITIES:
            console.info(`${actions.GET_CITIES} payload: ${JSON.stringify(action.payload)}`);

            return {
                cities: action.payload
            };

        default:
            return state;
    }
}
