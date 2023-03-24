import { createStore } from 'redux';

const initialState = {
    myNumber: 0
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_NUMBER':
            return {
                ...state,
                myNumber: action.payload
            };
        default:
            return state;
    }
}

export const store = createStore(rootReducer);