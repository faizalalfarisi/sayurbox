import { createStore } from "redux"

const initialState = {
    counter: null,
};

function reducer(state = initialState, action) {
    if (action.type === 'Detail Page') {
        return { ...state, counter: action.data}
    } else {
        return state;
    }
}

const store =  createStore(reducer);

export default store;