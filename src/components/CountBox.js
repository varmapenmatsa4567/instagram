import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { TbMessageCircle2,TbSend } from 'react-icons/tb';
import { addLike, disLike } from '../utils/postOpertions';

const CountBox = ({ data, currentUser, postId }) => {
  return (
    <div className='text-white flex justify-between'>
        <div className='flex gap-3 text-3xl'>
            {data.likes.includes(currentUser.username) ? <AiFillHeart onClick={() => disLike(postId, currentUser.username)} className='text-[#EB4649] cursor-pointer'/> : <AiOutlineHeart onClick={() => addLike(postId, currentUser.username)} className='cursor-pointer hover:text-[#8E8E8E]'/>}  
            <TbMessageCircle2 className='cursor-pointer hover:text-[#8E8E8E]'/>
            <TbSend className='cursor-pointer hover:text-[#8E8E8E]'/>
        </div>
        <BiBookmark className='text-3xl cursor-pointer hover:text-[#8E8E8E]'/>
    </div>
  )
}

export default CountBox