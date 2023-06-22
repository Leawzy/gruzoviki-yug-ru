import { applyMiddleware, combineReducers, createStore } from 'redux';

import cartReducer from './cartReducer';
import favoritesReducer from './favoritesReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    cart: cartReducer,
    favorites: favoritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
