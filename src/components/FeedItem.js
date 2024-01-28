import React, { useEffect, useState } from 'react'
import { BsDot, BsThreeDots, BsEmojiSmile } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { TbMessageCircle2,TbSend } from 'react-icons/tb';
import Video from './Video';
import Backdrop from './Backdrop';
import { getUser } from '../utils/userDetails';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { addComment, addLike, disLike } from '../utils/postOpertions';
import CommentsBox from './CommentsBox';
import CountBox from './CountBox';
import ReactTimeAgo from 'react-time-ago';

const FeedItem = ({ uname, type, postId }) => {
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);
    const [user, setUser] = useState();
    const currentUser = useSelector((state) => state.user.user);
    const [data, setData] = useState();
    const [showComments, setShowComments] = useState(false);

    const addToComment = () => {
        if(comment) {
            addComment(postId, {comment: comment, username: currentUser.username, date: new Date()});
            setComment('');
        }
    }
    
    // console.log(uname);
    useEffect(() => {
        getUser(uname).then((user) => {
            console.log("user"+user);
            setUser(user);
        });
        const unsub = onSnapshot(doc(db, "posts", postId), (doc) => {
            console.log("Current data: ", doc.data());
            setData(doc.data());
        });
    }, [])
    if(!user) return null;
    if(!data) return null;
  return (
    <div className='w-full flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src={user.profile}/>
                <p className='text-sm font-semibold ml-2'>{uname}</p>
                <BsDot className='mt-1 text-[#A8A8A8]'/>
                <p className='text-sm text-[#A8A8A8]'><ReactTimeAgo date={new Date(data.date.toDate())} /></p>
            </div>
            <BsThreeDots className='text-white cursor-pointer' onClick={() => setShow(true)}/>
            {show && <Backdrop>
                    <p>Hello</p>
                </Backdrop>}
        </div>
        <div className='rounded-md border border-[#262626]'>
            {type!='video' && <img className='rounded-md' src={data.url}/>}
            {type=='video' && <Video media={data.url}/>}
        </div>
        <CountBox currentUser={currentUser} postId={postId} data={data}/>
        {data.likes.length > 0 && <p className='text-white text-sm font-semibold'>{data.likes.length} likes</p>}
        <p className='text-sm'><span className='font-semibold hover:text-[#A8A8A8] cursor-pointer'>{uname} </span>{data.caption}</p>
        {data.comments.length > 0 && <button onClick={() => setShowComments(true)} className='text-left text-sm text-[#A8A8A8]'>View all {data.comments.length} comments</button>}
        <div className='flex items-center'>
            <input value={comment} onChange={(e) => setComment(e.target.value)} className='flex-1 bg-transparent outline-none text-sm placeholder:text-[#A8A8A8]' type='text' placeholder='Add a comment...'/>
            {comment && <button onClick={addToComment} className='mx-1 hover:text-white text-sm text-[#4193EF] font-semibold'>Post</button>}
            <BsEmojiSmile className='text-[#A8A8A8] cursor-pointer'/>
        </div>
        <div className='border-b border-b-[#262626] my-4'></div>
        {showComments && <CommentsBox currentUser={currentUser} postId={postId} data={data} onClose={() => setShowComments(false)} uname={uname} profile={user.profile} media={data.url} comments={data.comments}/>}
    </div>
  )
}

export default FeedItem