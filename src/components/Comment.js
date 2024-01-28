import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/userDetails';

const Comment = ({comment}) => {
    const [profile, setProfile] = useState();
    useEffect(() => {
        getUser(comment.username).then((user) => {
            setProfile(user.profile);
        });
    }, [])
    if(!profile) return null;
  return (
    <div className='flex px-4 py-2'>
        <img src={profile} className='w-10 h-10 rounded-full'/>
        <div className='flex flex-col ml-2'>
            <p className='text-white text-sm font-bold'>{comment.username}</p>
            <p className='text-white text-sm'>{comment.comment}</p>
        </div>
    </div>
  )
}

export default Comment