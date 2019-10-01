export const actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
};

export const add = city => {
    console.info(`${actions.ADD} payload: ${city}`);
    return {
        type: actions.ADD,
        payload: city
    }
};

export const remove = city => {
    console.info(`${actions.ADD} payload: ${city}`);
    return {
        type: actions.REMOVE,
        payload: city
    }
};

