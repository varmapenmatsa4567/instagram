import React from 'react'
import StatusBar from '../components/StatusBar'
import Feed from '../components/Feed'

const HomePage = () => {
  return (
    <div className='text-white overflow-y-auto flex justify-around w-full'>
      <div className='w-[630px] flex flex-col justify-center'>
        <StatusBar/>
        <Feed/>
      </div>
      <div></div>
    </div>
  )
}

export default HomePage