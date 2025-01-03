import React, { useEffect, useState } from 'react'
import { useQuery , useMutation } from '@tanstack/react-query'
import { deletePostAPI, getAllPostAPI } from '../../services/posts/postsApi'
import { Link, useLocation } from 'react-router-dom'
import "./post.css"
import NoDataFoundAlert from '../Alert/NoDataFoundAlert'
import AlertMessage from '../Alert/AlertMessage'
import { useGetAllPostAPIQuery , useDeletePostAPIMutation } from '../../redux/api/postsApi'
import { useSelector } from 'react-redux'
import PostCategory from '../Category/PostCategory'
import { axiosObj } from '../../utils/axiosObj'



const PostsList = () => {

    const [page, setPage] = useState(1)
    const [categories , setCategories] = useState([])
    
    const location = useLocation()

    const {token} = useSelector((state) => state.auth)

    const {data , isError , isLoading , error , refetch} = useGetAllPostAPIQuery({token , page})

    const [deletePostAPI , {isLoading : isLoadingDeletePost , isSuccess , isError : isDeletePostError , error : deletePostError}] = useDeletePostAPIMutation()

    const handlePostDelete = async (postId) => {
        try {
            await deletePostAPI({token , postId})
            await refetch()
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

      useEffect(() => {
    
        const getCategories = async () => {
          try {
            const response = await axiosObj.get("/category" , {
              headers : {
                "Authorization" : `Bearer ${token}`
              }
            })
            setCategories(response.data)
          } catch (error) {
            console.log(error)
          }
        }
    
        getCategories()
    
      } , [])
    

    useEffect(() => {
        if (location?.state?.refresh) {
          refetch()
        }
      }, [location.state, refetch])
    


      // Clear the state to prevent repeated refetches on other renders
      useEffect(() => {
        if (location?.state?.refresh) {
          location.state.refresh = false
        }
      }, [location])



    const handleNextPage = () => {
        setPage((prev) => prev + 1)
    }

    const handlePreviousPage = () => {
        setPage((prev) => Math.max(prev - 1, 1))
    }

    if (isLoading || isLoadingDeletePost) return <AlertMessage type={"loading"} message={"Loading please wait ..."}/>
    if (isError || isDeletePostError) return <AlertMessage type={"error"} message={"Something happened"}/>
    if(data?.posts?.length <= 0) return <NoDataFoundAlert textMsg={"no posts found"}/>



  return (
    <div>

        <section className='overflow-hidden'>

            <div className='container px-4 mx-auto'>

                <h1 className='text-4xl lg:text-6xl font-bold font-heading mb-10'>Blog</h1>

                {/* featured posts */}
                <h2 className='text-4xl font-bold font-heading mb-10'>Latest articles</h2>
                
                {/* post category */}
                <PostCategory
                    categories={categories}
                    // onCategorySelect={handleCategoryfilter}
                />

                <div className='flex flex-wrap mb-32 -mx-4'>

                    {/* posts */}
                    {data?.posts?.map((post) => (

                        <div key={post?._id} className="w-full md:w-1/2 lg:w-1/3 p-4">

                            <Link to={`/post/${post?._id}`}>

                                <div className='bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3'>

                                    <div className='relative' style={{height : 240}}>

                                        <div className='absolute top-0 left-0 z-10'></div>
                                        <div className='absolute bottom-0-0 right-0-0 z-10'></div>

                                        <img src={post?.image?.path} alt={post?.description} className='absolute inset-0 w-full h-full object-cover rounded-2xl' />

                                    </div>

                                    <div className='pt-6 pb-3 px-4'>

                                        <div className='rendered-html-content mb-2' dangerouslySetInnerHTML={{__html : post?.description}} />

                                        <div className='flex flex-wrap items-center gap-3'>

                                            <p className='text-gray-500 text-sm'>
                                                {new Date(post?.createdAt).toLocaleDateString()}
                                            </p>

                                            <svg fill='none' viewBox='0 0 4 4' width={4} xmlns='http://www.w3.org/2000/svg'>
                                                <circle  cx={2} cy={2} r={2} fill='#B8B8B8'/>
                                            </svg>

                                            <div className='py-1 px-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 inline-block'>
                                                {post?.category?.categoryName}
                                            </div>

                                        </div>


                                    </div>

                                </div>

                            </Link>

                        </div>

                    ))}


                </div>

            </div>


            {/* pagintation */}
            {/* <div className='flex justify-center items-center my-8 space-x-4'>
                
                {isPreviousButtonVisible && (
                    <button onClick={() => handlePageChange(page - 1)} className='px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                        Previous
                    </button>
                )}

                <span className='text-sm font-semibold'>
                    page {page} of {data?.totalPages}
                </span>

                {isNextButtonVisible && (
                    <button onClick={() => handlePageChange(page + 1)} className='px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                        Next
                    </button>
                )}

            </div> */}

        </section>

            

    </div>
  )
}


export default PostsList







// {data.posts && data?.posts?.map((post) => (

//     <div key={post?._id}>

//         {/* <h2>{post?.title}</h2> */}
        
//         {/* <p>{post?.description}</p> */}

//         <div dangerouslySetInnerHTML={{__html : post?.description}}/>
        
//         <Link to={`/post/${post?._id}`}>
//             <button>Edit post</button>
//         </Link>

//         <button onClick={() => handlePostDelete(post?._id)}>delete post</button>

//     </div>

// ))}

//     <div>

//         <button onClick={handlePreviousPage} disabled={page === 1}>
//             Previous
//         </button>

//         <span>Page {data?.page} of {data?.totalPages === 0 ? page : data?.totalPages}</span>

//         <button onClick={handleNextPage} disabled={page >= data.totalPages}>
//             Next
//         </button>

//     </div>
