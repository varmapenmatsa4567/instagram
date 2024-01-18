import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrentUser, getUser } from '../utils/userDetails';
import { FiSettings } from 'react-icons/fi';
import ProfileItem from '../components/ProfileItem';
import { BsGrid3X3 } from 'react-icons/bs';
import { CiCamera } from 'react-icons/ci';
import { BiBookmark, BiUserPin } from 'react-icons/bi';

const ProfilePage = () => {
    const { username } = useParams();
    const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        getCurrentUser().then((user) => {
            setCurrentUser(user);
        });
        getUser(username).then((user) => {
            setUser(user);
        });
    }, [])
  return (
    <div className='w-full flex justify-center'>
        <div className='w-2/3 flex flex-col'>
            <div className='my-6 flex'>
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' className='w-36 h-36 rounded-full mx-20'/>
                <div className='flex flex-col gap-5'>
                    <div className='flex text-white items-center gap-4'>
                        <p className='text-lg'>{username}</p>
                        <button className='bg-[#363636] hover:bg-[#232323] px-4 text-sm font-semibold p-1.5 rounded-lg'>Edit Profile</button>
                        <button className='bg-[#363636] hover:bg-[#232323] px-4 text-sm font-semibold p-1.5 rounded-lg'>View archive</button>
                        <FiSettings className='text-xl cursor-pointer'/>
                    </div>
                    <div className='text-white flex gap-8'>
                        <p>0 posts</p>
                        <p>0 followers</p>
                        <p>6 following</p>
                    </div>
                    <p className='text-white text-sm font-semibold'>{user.name}</p>
                </div>
            </div>
            <div className='border-t border-t-[#262626] w-full mt-5 flex justify-center gap-10'>
                <ProfileItem Icon={BsGrid3X3} title='Posts' active/>
                <ProfileItem Icon={BiBookmark} title='Saved'/>
                <ProfileItem Icon={BiUserPin} title='Tagged'/>
            </div>
            <div className='flex flex-col text-white w-full justify-center items-center py-24 gap-4'>
                <div className='cursor-pointer text-[#262626] rounded-full border-2 border-[#262626] p-2 flex items-center justify-center'><CiCamera className='text-5xl'/></div>
                <p className='text-3xl font-extrabold'>Share photos</p>
                <p className='text-sm w-80 text-center'>When you share photos, they will appear on your profile.</p>
                <p className='text-sm font-semibold text-[#4193EF] cursor-pointer hover:text-white'>Share your first photo</p>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage