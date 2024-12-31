import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from "./reducer/auth.reducer";
import permissionReducer from "./reducer/permission.reducer";
import { apiSlice } from "@/services/rtk-query/apiSlice";


const persistConfig = {
    key: 'root',
    storage: storageSession,  // muốn lưu vào local storage thì thay storageSession thành storage
    whitelist: ['auth', 'permission'] // muốn chỉ lưu thg nào thì bỏ vào whitelist
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    permission: permissionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Needed for redux-persist
        }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store)