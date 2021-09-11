import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const initialState = {};

const persistConfig = {
	key: 'root',
	storage,
};

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	persistedReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
