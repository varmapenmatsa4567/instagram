import React from 'react'
import {GrClose} from 'react-icons/gr'

const Backdrop = ({children}) => {
  return (
    <div className='h-screen flex w-screen items-center justify-center z-2 bg-black bg-opacity-70 fixed top-0 left-0'>
        {children}
        <GrClose className='absolute right-4 top-4 text-xl cursor-pointer'/>
    </div>
  )
}

export default Backdrop