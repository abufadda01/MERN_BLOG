import {axiosObj} from "../../utils/axiosObj"



export const registerAPI = async (userData) => {
    try {
        const response = await axiosObj.post(`/user/register` , {
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
        const response = await axiosObj.post(`/user/login` , {
            username : userData?.username ,
            password : userData?.password ,
        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : "Error occured"
    }
}
