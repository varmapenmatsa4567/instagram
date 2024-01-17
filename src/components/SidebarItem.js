import React from 'react'

const SidebarItem = ({ Icon, title, custom }) => {
  return (
    <div className='text-white flex gap-2 items-center w-full p-2 cursor-pointer hover:bg-[#1A1A1A] rounded-lg'>
        {custom && <Icon className='text-2xl'/>}
        {!custom && <Icon className='text-3xl'/>}
        <p className='hidden xl:block'>{title}</p>
    </div>
  )
}

export default SidebarItem