import {createSlice} from "@reduxjs/toolkit"


const authSlice = createSlice({
    name : "auth" ,
    initialState : {
        user : null
    },
    reducers : {
        isAuthenticated : (state , action) => {
            state.user = action.payload
        },
        logout : (state , action) => {
            state.user = null
        },
    }
})



export const {isAuthenticated , logout} = authSlice.actions


export default authSlice