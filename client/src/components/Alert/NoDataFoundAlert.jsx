import React from 'react'


const NoDataFoundAlert = ({textMsg}) => {
  return (
    <div className='text-center mt-6'>
        <h2>{textMsg}</h2> 
    </div>
  )
}

export default NoDataFoundAlert