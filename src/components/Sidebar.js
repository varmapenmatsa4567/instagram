import React from 'react'
import instagramWhite from '../images/instagram-white.png';
import SidebarItem from './SidebarItem';
import { RiHome2Line } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineExplore, MdOutlineAddBox } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import { AiOutlineHeart, AiOutlineInstagram } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { IoReorderThreeOutline } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className='z-1 p-3 flex-col bg-black hidden md:flex fixed md:w-[73px] xl:w-[245px] h-screen border-r border-r-[#262626]'>
        <div className='xl:hidden my-3'><SidebarItem Icon={AiOutlineInstagram}/></div>
        <img src={instagramWhite} alt="instagram" className='hidden xl:block w-28 my-3 ml-2' />
        <div className='flex flex-col gap-3'>
            <SidebarItem Icon={RiHome2Line} title='Home' />
            <SidebarItem Icon={BiSearch} title='Search'  />
            <SidebarItem Icon={MdOutlineExplore} title='Explore' />
            <SidebarItem Icon={FiSend} title='Messages' />
            <SidebarItem Icon={AiOutlineHeart} title='Notifications' />
            <SidebarItem Icon={MdOutlineAddBox} title='Create'/>
            <SidebarItem Icon={RxAvatar} title='Profile'/>
        </div>
        <div className='flex-1 flex flex-col justify-end mb-5'>
            <SidebarItem Icon={IoReorderThreeOutline} title='More' />
        </div>
        
    </div>
  )
}

export default Sidebar