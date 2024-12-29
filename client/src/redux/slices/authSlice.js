import {createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    name : "auth" ,
    initialState : {
        user : null ,
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null ,    
    },
    reducers : {
        isAuthenticated : (state , action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        logout : (state , action) => {
            state.user = null
            state.token = null;
            localStorage.removeItem("token");
        },
    }
})



export const {isAuthenticated , logout} = authSlice.actions


export default authSlice