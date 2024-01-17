import React from 'react'

const StatusItem = ({title}) => {
  return (
    <div className='flex flex-col items-center justify-center w-[66px] h-[85px] gap-1 cursor-pointer'>
        {/* <div className='rounded-full w-[56px] h-[56px] bg-red-400'></div> */}
        <img className='rounded-full w-[56px] h-[56px] bg-red-400' src='https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg'/>
        <p className='overflow-x-hidden overflow-y-hidden whitespace-nowrap w-[66px] text-ellipsis text-xs'>chiranjeevi varma</p>
    </div>
  )
}

export default StatusItem