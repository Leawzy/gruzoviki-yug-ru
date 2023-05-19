import { Reducer } from 'redux';

const initialState: { id: string }[] = [];

const favoritesReducer: Reducer<{ id: string }[]> = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return [...state, { id: action.payload }];
        case 'REMOVE_FROM_FAVORITES':
            return state.filter(item => item.id !== action.payload);
        case 'FETCH_FAVORITES_SUCCESS':
            return action.payload.map((id: number) => ({ id: String(id) }));
        default:
            return state;
    }
};
export default favoritesReducer;
