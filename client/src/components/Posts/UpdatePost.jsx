import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import {useMutation, useQuery} from "@tanstack/react-query"
import { createPostAPI, getPostAPI, updatePostAPI } from '../../services/posts/postsApi'
import { useParams } from 'react-router-dom'



const UpdatePost = () => {

    const {postId} = useParams()

    const {data : post , isLoading} = useQuery({
        queryKey : ["single-post" , postId],
        queryFn : () => getPostAPI(postId)
    })

    const postMutation = useMutation({
        mutationFn : updatePostAPI ,
        mutationKey : ["update-post"]
    })


    const formik = useFormik({
        initialValues : {
            title : post?.title || "" ,
            description : post?.description || ""
        },
        enableReinitialize : true ,
        validationSchema : Yup.object({
            title : Yup.string().min(5).required("title is required"),
            description : Yup.string().min(5).required("description is required"),
        }),
        onSubmit : (values) => {
            const postData = {
                title : values.title ,
                description : values.description ,
                _id : post?._id
            }
            postMutation.mutate(postData) // when i call the mutate key the mutationFn function will execute
        }
    })


    const {isPending , error , isError , isSuccess} = postMutation


  return (
    <div>

        <h1>you are editing - {post?.title}</h1>

        <div>

            {isPending && <span>Loading....</span>}
            {isError && <span>{error.message}</span>}
            {isSuccess && <span>Post updated successfully</span>}

            <form onSubmit={formik.handleSubmit}>

                {formik.touched.title && formik.errors.title && (<span style={{color : "red"}}>{formik.errors.title}</span>)}
                <input type="text" name='title' placeholder='enter title' {...formik.getFieldProps("title")} />

                {formik.touched.description && formik.errors.description && (<span style={{color : "red"}}>{formik.errors.description}</span>)}            
                <input type="text" name='description' placeholder='enter description' {...formik.getFieldProps("description")} />

                <button>update post</button>

            </form>

        </div>
    
    </div>
  )
}


export default UpdatePost