import {axiosObj} from "../../utils/axiosObj"



export const createPostAPI = async (postData) => {
    try {
        const response = await axiosObj.post(`/posts/create` , postData , {
            withCredentials : true

        })
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : "Error occured"
    }
}



export const updatePostAPI = async (postData) => {
    try {
        const response = await axiosObj.put(`/posts/${postData?._id}` , {
            title : postData.title ,
            description : postData.description
        } , {
            withCredentials : true
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : "Error occured"
    }
}



export const getAllPostAPI = async (page) => {
    try {
        const response = await axiosObj.get(`/posts?page=${page}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : "Error occured"
    }
}



export const getPostAPI = async (postId) => {
    try {
        const response = await axiosObj.get(`/posts/${postId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : "Error occured"
    }
}




export const deletePostAPI = async (postId) => {
    try {
        const response = await axiosObj.delete(`/posts/${postId}` , {withCredentials : true})
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response ? error.response.data : "Error occured"
    }
}