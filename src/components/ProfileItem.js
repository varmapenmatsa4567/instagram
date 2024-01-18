import React from 'react'

const ProfileItem = ({ Icon, title, active }) => {
  return (
    <div className={`${active && 'text-white'} text-[#A8A8A8] cursor-pointer flex items-center gap-2 pt-4 ${active && 'border-t'}  border-t-white`}>
        <Icon className='text-xs'/>
        <p className='uppercase text-xs font-semibold tracking-widest'>{title}</p>
    </div>
  )
}

export default ProfileItem