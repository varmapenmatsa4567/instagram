import React, { useState } from 'react'
import { BsDot, BsThreeDots, BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { TbMessageCircle2,TbSend } from 'react-icons/tb';
import Video from './Video';

const FeedItem = ({ profile, uname, media, type }) => {
    const [comment, setComment] = useState('');
  return (
    <div className='w-full flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src={profile}/>
                <p className='text-sm font-semibold ml-2'>{uname}</p>
                <BsDot className='mt-1 text-[#A8A8A8]'/>
                <p className='text-sm text-[#A8A8A8]'>1 w</p>
            </div>
            <BsThreeDots className='text-white cursor-pointer'/>
        </div>
        <div className='rounded-md border border-[#262626]'>
            {type!='video' && <img className='rounded-md' src={media}/>}
            {type=='video' && <Video media={media}/>}
        </div>
        <div className='text-white flex justify-between'>
            <div className='flex gap-3 text-3xl'>
                <AiOutlineHeart className='cursor-pointer hover:text-[#8E8E8E]'/>
                <TbMessageCircle2 className='cursor-pointer hover:text-[#8E8E8E]'/>
                <TbSend className='cursor-pointer hover:text-[#8E8E8E]'/>
            </div>
            <BiBookmark className='text-3xl cursor-pointer hover:text-[#8E8E8E]'/>
        </div>
        <p className='text-white text-sm font-semibold'>7,999 likes</p>
        <p className='text-sm'><span className='font-semibold hover:text-[#A8A8A8] cursor-pointer'>{uname} </span>Link in Bio & Stories...</p>
        <button className='text-left text-sm text-[#A8A8A8]'>View all 16 comments</button>
        <div className='flex items-center'>
            <input value={comment} onChange={(e) => setComment(e.target.value)} className='flex-1 bg-transparent outline-none text-sm placeholder:text-[#A8A8A8]' type='text' placeholder='Add a comment...'/>
            {comment && <button className='mx-1 hover:text-white text-sm text-[#4193EF] font-semibold'>Post</button>}
            <BsEmojiSmile className='text-[#A8A8A8] cursor-pointer'/>
        </div>
        <div className='border-b border-b-[#262626] my-4'></div>
    </div>
  )
}

export default FeedItem