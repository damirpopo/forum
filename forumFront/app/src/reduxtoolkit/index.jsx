import {combineReducers, configureStore} from "@reduxjs/toolkit";
import api from "./api";
import toolkitSlice from "./toolkitSlice";

const rootreduce = combineReducers({
    [api.reducerPath]: api.reducer,
    toolkit: toolkitSlice
})

export const store = configureStore({
    reducer: rootreduce,
    middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(api.middleware),
})