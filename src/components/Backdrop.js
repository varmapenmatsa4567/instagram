import React from 'react'
import {GrClose} from 'react-icons/gr'
import { createPortal } from 'react-dom';

const Backdrop = ({children, onClose}) => {
  return createPortal(
    <div className='h-screen flex w-screen items-center justify-center z-50 bg-black bg-opacity-40 fixed top-0 left-0'>
        {children}
        <GrClose onClick={onClose} className='text-white absolute right-4 top-4 text-xl cursor-pointer'/>
    </div>,
    document.getElementById('portal-root')
  )
}

export default Backdrop