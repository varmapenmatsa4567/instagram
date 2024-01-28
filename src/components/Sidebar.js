import React, { useEffect, useState } from 'react'
import instagramWhite from '../images/instagram-white.png';
import SidebarItem from './SidebarItem';
import { RiHome2Line, RiHome2Fill } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineExplore, MdOutlineAddBox } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import { AiOutlineHeart, AiOutlineInstagram } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { logout } from '../utils/authUser';
import { getCurrentUser } from '../utils/userDetails';
import { useNavigate } from 'react-router-dom';
import { FaPhotoVideo } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import Backdrop from './Backdrop';
import { createPost, uploadFiles } from '../utils/postOpertions';
import { BsCheckCircle } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Sidebar = () => {
   const currentPath = useLocation().pathname;
   const navigate = useNavigate();
   const user = useSelector((state) => state.user.user);
   const [createModal, setCreateModal] = useState(false);
   const modes = ['Create new post', 'Crop', 'Create new Post', 'Sharing', 'Post Shared'];
   const [mode, setMode] = useState(0);
   const [files, setFiles] = useState([]);
   const [selectedImage, setSelectedImage] = useState(null);
   const [caption, setCaption] = useState('');

   const changeMode = (x) => {
      setMode((prev) => prev + x);
   }

   const showModal = () => {
      setCreateModal(true);
   }

   const back = () => {
      changeMode(-1);
   }

   const next = () => {
      if(mode == 2){
         changeMode(1);
         console.log("uploading");
         uploadFiles(files).then((urls) => {
            createPost(user.username, caption, urls).then(() => {
               console.log("Post created");
               changeMode(1);
            })
         })
      }
      else{
         changeMode(1);
      }
   }


   const handleFiles = (e) => {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
           setSelectedImage(reader.result);
         };
         reader.readAsDataURL(file);
       } else {
         setSelectedImage(null);
       }
      setFiles(e.target.files);
      changeMode(1);
   }

   const selectFiles = () => {
      document.getElementById('postfile').click();
   }

   const closeModal = () => {
      setMode(0);
      setCaption("");
      setCreateModal(false);
   }

   const goToProfile = () => {
      console.log();
      navigate(`/${user.username}`);
   }
    
  return (
    <div className='z-1 p-3 flex-col bg-black hidden md:flex fixed md:w-[73px] xl:w-[245px] h-screen border-r border-r-[#262626]'>
        <div className='xl:hidden my-3'><SidebarItem Icon={AiOutlineInstagram}/></div>
        <img src={instagramWhite} alt="instagram" className='hidden xl:block w-28 my-3 ml-2' />
        <div className='flex flex-col gap-3'>
            <SidebarItem Icon={currentPath == '/' ? RiHome2Fill : RiHome2Line} title='Home' current onClick={() => navigate("/")}/>
            <SidebarItem Icon={BiSearch} title='Search'  />
            <SidebarItem Icon={MdOutlineExplore} title='Explore' />
            <SidebarItem Icon={FiSend} title='Messages' />
            <SidebarItem Icon={AiOutlineHeart} title='Notifications' />
            <SidebarItem Icon={MdOutlineAddBox} title='Create' onClick={showModal}/>
            <SidebarItem Icon={RxAvatar} title='Profile' onClick={goToProfile}/>
        </div>
        <div className='flex-1 flex flex-col justify-end mb-5'>
            <SidebarItem Icon={IoReorderThreeOutline} title='More' onClick={logout} />
        </div>
        
        {createModal && 
        <Backdrop onClose={closeModal}>
            <div className={`bg-[#262626] rounded-xl ${mode == 2 ? 'w-3/5' : 'w-2/5'} h-4/5 flex flex-col`}>
               <input onChange={handleFiles} multiple type='file' id='postfile' className='hidden'/>
               <div className={`flex items-center ${mode > 0 && mode < 3 ? 'justify-between' : 'justify-center'} text-white`}>
                  {mode > 0 && mode < 3 && <BiArrowBack className='text-2xl ml-3 cursor-pointer' onClick={back}/>}
                  <p className='font-semibold text-center py-2'>{modes[mode]}</p>
                  {mode > 0 && mode < 3 && <button onClick={next} className='text-sm font-semibold text-[#4193EF] mr-3 hover:text-white'>{mode == 1 ? 'Next' : 'Share'}</button>}
               </div>
               {mode > 0 && mode < 3 &&
                  <div className='flex-1 flex justify-center border-t border-t-[#363636] items-center bg-[#121212]'>
                     <img className={`${mode == 2 && 'w-2/3'}`} src={selectedImage}/>
                     {mode == 2 && 
                        <div className='text-white flex flex-col w-1/3 bg-[#262626] h-full border-l border-l-[#363636]'>
                           <div className='flex pt-3 pl-3 items-center gap-3'>
                              <img className='w-7 h-7 rounded-full cursor-pointer' src={user.profile || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}/>
                              <p className='text-sm font-semibold'>{user.username}</p>
                           </div>
                           <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={7} className='bg-transparent outline-none p-3 resize-none' placeholder='Write a caption...'>

                           </textarea>
                        </div>
                     }
                  </div>
               }
               {mode == 4 && 
                  <div className='border-t border-t-[#363636] text-white flex flex-col justify-center items-center flex-1'>
                     <BsCheckCircle className='text-6xl text-green-600'/>
                     <p className='my-3 text-2xl'>Your post has been shared.</p>
                  </div>
               }
               {mode == 0 && <div className='flex-1 border-t border-t-[#363636] flex flex-col justify-center items-center'>
                  <FaPhotoVideo className='text-white text-7xl'/>
                  <p className='text-white text-xl my-2'>Drag photos and videos here</p>
                  <button onClick={selectFiles} className='bg-[#4193EF] hover:bg-[#3975EA] text-white text-sm font-semibold p-2 rounded-lg px-3 my-2'>Select from Computer</button>
               </div>}
            </div>
        </Backdrop>}
    </div>
  )
}

export default Sidebar