export const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
};

export const add = city => {
    return {
        type: actions.ADD,
        payload: city
    }
};

export const remove = city => {
    return {
        type: actions.REMOVE,
        payload: city
    }
};

