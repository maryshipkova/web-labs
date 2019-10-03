export const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
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

