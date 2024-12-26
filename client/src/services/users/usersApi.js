import {axiosObj} from "../../utils/axiosObj"



export const registerAPI = async (userData) => {
    try {
        const response = await axiosObj.post(`/users/register` , {
            username : userData?.username ,
            email : userData?.email ,
            password : userData?.password ,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : "Error occured"
    }
}




export const loginAPI = async (userData) => {
    try {
        const response = await axiosObj.post(`/users/login` , {
            username : userData?.username ,
            password : userData?.password ,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : "Error occured"
    }
}




export const logoutAPI = async () => {
    try {
        const response = await axiosObj.post(`/users/logout`)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : "Error occured"
    }
}




export const checkAuthStatusAPI = async () => {
    try {
        const response = await axiosObj.post(`/users`)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : "Error occured"
    }
}
