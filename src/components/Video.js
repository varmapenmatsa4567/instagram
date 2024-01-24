import React , { useState } from 'react'
import {FaPlay} from 'react-icons/fa'
import {BiVolumeFull, BiVolumeMute} from 'react-icons/bi'

const Video = ({media}) => {

    const [playing, setPlaying] = useState(true);
    const [isMute, setIsMute] = useState(true);

    const toggleMute = () => {
        const video = document.querySelector('video');
        video.muted = !video.muted;
        setIsMute(!isMute);
    }

    const playPause = () => {
        const video = document.querySelector('video');
        if(video.paused){
            setPlaying(true);
            video.play();
        }else{
            setPlaying(false);
            video.pause();
        }
    }
  return (
    <div className='relative'>
        <video  onClick={playPause} className='w-full cursor-pointer' autoPlay muted loop>
            <source src={media} type="video/mp4"/>
        </video>
        <div className='absolute right-2 bottom-2 cursor-pointer bg-black p-1 rounded-full'>
            {!isMute && <BiVolumeFull onClick={toggleMute}/>}
            {isMute && <BiVolumeMute onClick={toggleMute}/>}
        </div>
        {!playing && <FaPlay onClick={playPause} className='cursor-pointer absolute text-4xl left-1/2 top-1/2'/>}
    </div>
  )
}

export default Video