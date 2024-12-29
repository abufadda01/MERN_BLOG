import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import { authApi } from "../api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { postsApi } from "../api/postsApi";


export const store = configureStore({
    reducer : {
        auth : authSlice.reducer ,
        [authApi.reducerPath]: authApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
            .concat(authApi.middleware) 
            .concat(postsApi.middleware) ,
        devTools: true,
})


setupListeners(store.dispatch);
