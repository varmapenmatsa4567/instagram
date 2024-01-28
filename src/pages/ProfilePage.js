import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCurrentUser, getUser, updateUserStore } from '../utils/userDetails';
import { FiSettings } from 'react-icons/fi';
import ProfileItem from '../components/ProfileItem';
import { BsGrid3X3 } from 'react-icons/bs';
import { CiCamera } from 'react-icons/ci';
import { BiBookmark, BiUserPin } from 'react-icons/bi';
import { uploadProfile, changeProfile } from '../utils/userDetails';
import { db } from '../firebase.config';
import { collection, doc, getDoc, getDocs, query, where, updateDoc, onSnapshot } from "firebase/firestore";
import Backdrop from '../components/Backdrop';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/user';

const ProfilePage = () => {
    const { username } = useParams();
    const [currentUser, setCurrentUser] = useState();
    const [image, setImage] = useState();
    const [urlUser, setUrlUser] = useState();
    const [profile, setProfile] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const u = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        getCurrentUser().then((user) => {
            setCurrentUser(user);
            dispatch(setUser(user));
        });
        getUser(username).then((user) => {
            setUrlUser(user);
        });
    }, [profile])

    const handleImage = (e) => {
        setLoading(true);
        console.log(e.target.files[0])
        setImage(e.target.files[0]);
        uploadProfile(e.target.files[0], username).then((url) => {
            changeProfile(url).then(() => {
                console.log("Profile changed");
                setProfile((prev) => prev + "changed");
                setLoading(false);
            });
        });
    }

    const removeImage = () => {
        closeModal();
        setLoading(true);
        changeProfile("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png").then(() => {
            console.log("Profile changed");
            setProfile((prev) => prev + "changed");
            setLoading(false);
        });
    }

    const closeModal = () => {
        setImageModal(false);
    }

    const showModal = () => {
        setImageModal(true);
    }

    const pickImage = () => {
        closeModal();
        document.getElementById('file').click();
    }
  return (
    <div className='w-full flex justify-center'>
        {currentUser && <div className='w-2/3 flex flex-col'>
            <div className='my-6 flex'>

                <div className='relative w-36 h-36 flex justify-center items-center mx-20'>
                    <img onClick={showModal} className='w-36 h-36 rounded-full mx-20 cursor-pointer' src={currentUser.profile}/>
                    {loading && 
                    <div className='absolute bg-gray-200 bg-opacity-20 w-full h-full flex justify-center items-center rounded-full'><svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg></div>}
                </div>

                {imageModal && <Backdrop onClose={closeModal}>
                    <div className='bg-[#262626] rounded-xl'>
                        <p className='text-white py-5 text-xl text-center'>Change profile photo</p>
                        <div className='text-[#4193EF] cursor-pointer py-4 text-sm font-bold border-t border-t-[#363636] w-96 text-center' onClick={pickImage}>Upload photo</div>
                        <div className='text-[#DB565B] cursor-pointer py-4 text-sm font-bold border-t border-t-[#363636] w-96 text-center' onClick={removeImage}>Remove current photo</div>
                        <div className='text-white cursor-pointer py-4 text-sm border-t border-t-[#363636] w-96 text-center' onClick={closeModal}>Cancel</div>
                    </div>
                </Backdrop>}

                <input onChange={handleImage} id='file' type='file' className='hidden' accept='image/*'/>
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
                    <p className='text-white text-sm font-semibold'>{currentUser && currentUser.name}</p>
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
        </div>}
    </div>
  )
}

export default ProfilePage