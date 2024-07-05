import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {thunk} from 'redux-thunk'; // Import redux-thunk
import loginReducer from "./loginSlice";

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, loginReducer);

const AppStore = configureStore({
    reducer: {
        login: persistedReducer,
    },
    // Adding the redux-thunk middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(AppStore);
export default AppStore;
