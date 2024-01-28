import React from 'react'
import Backdrop from './Backdrop'
import Comment from './Comment'
import CountBox from './CountBox'
import { BsEmojiSmile } from 'react-icons/bs'
import { useState } from 'react'
import { addComment } from '../utils/postOpertions'
import ReactTimeAgo from 'react-time-ago'

const CommentsBox = ({ uname, profile, media, comments, onClose, currentUser, data, postId }) => {

  const [comment, setComment] = useState('');
  const addToComment = () => {
    if(comment){
      addComment(postId, {comment: comment, username: currentUser.username, date: new Date()});
      setComment('');
    }
  }

  return (
    <Backdrop onClose={onClose}>
        <div className='bg-black border shadow-lg border-gray-800 rounded-lg h-5/6 max-w-[90%] flex items-center'>
            <div className='max-w-3/5 h-full'>
              <img className='w-full h-full object-contain' src={media}/>
            </div>
            <div className='flex flex-col self-start w-[450px] border-l border-l-[#262626] h-full'>
                <div className='flex p-4 items-center gap-3 border-b border-b-[#262626] w-'>
                    <img className='w-10 h-10 rounded-full' src={profile}/>
                    <p className='text-white text-sm font-bold'>{uname}</p>
                </div>
                <div className='flex flex-1 flex-col gap-2 overflow-auto'>
                    {comments.map((comment) => (
                        <Comment comment={comment} />
                    ))}
                </div>
                
                <div className='p-3 flex flex-col gap-2 border-y border-y-[#262626]'>
                  <CountBox currentUser={currentUser} data={data} postId={postId}/>
                  <div>
                    {data.likes.length > 0 && <p className='text-white text-sm font-semibold'>{data.likes.length} likes</p>}
                    <p className='text-[#A8A8A8] text-sm'><ReactTimeAgo date={new Date(data.date.toDate())} /></p>
                  </div>
                </div>
                <div className='flex p-3 items-center gap-2'>
                  <BsEmojiSmile className='text-[#A8A8A8] cursor-pointer text-lg'/>
                  <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment...' type='text' className='bg-transparent outline-none text-white flex-1 text-sm'/>
                  <button onClick={addToComment} className='text-[#4193EF] text-sm font-semibold outline-none'>Post</button>
                </div>
            </div>
        </div>
    </Backdrop>
  )
}

export default CommentsBox