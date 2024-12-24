import {axiosObj} from "../../utils/axiosObj"



export const registerAPI = async (userData) => {
    console.log(userData)
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
