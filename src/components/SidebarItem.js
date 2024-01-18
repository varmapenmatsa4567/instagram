import React from 'react'

const SidebarItem = ({ Icon, title, custom, current, ...props }) => {
  return (
    <div {...props} className='text-white flex gap-2 items-center w-full p-2 cursor-pointer hover:bg-[#1A1A1A] rounded-lg'>
        {custom && <Icon className='text-2xl'/>}
        {!custom && <Icon className='text-3xl'/>}
        <p className={`hidden xl:block ${current && 'font-semibold'}`}>{title}</p>
    </div>
  )
}

export default SidebarItem