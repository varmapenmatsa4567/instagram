import React, { useEffect, useState } from 'react'
import FeedItem from './FeedItem'
import { getPosts } from '../utils/postOpertions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useImageSize } from 'react-image-size';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const ratio = "original"
  var h;
  const [dimensions, x] = useImageSize('https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwaW1hZ2VzfGVufDB8MXwwfHx8MA%3D%3D');
  if(dimensions){
    h = (dimensions.height/dimensions.width)*470;
    console.log(h);
  }
  if(ratio === "1:1"){
    h = 470;
  }
  else if(ratio === "4:5"){
    h = 587.5;
  }
  else if(ratio === "16:9"){
    h = 264.375;
  }
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      console.log(posts);
    });
  },[])
  return (
    <div className='w-[470px] flex-1 self-center'>
        {posts && posts.map((post) => {
          return <FeedItem key={post.id} profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname={post.data.username} media={post.data.url} data={post.data} postId={post.id}/>
        })}
        <Carousel dynamicHeight={false} className='h-[470px]' showThumbs={false}>
              <div className={`h-[${h}px]`}>
                <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className={`h-[${h}px]`}>
                <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className={`h-[${h}px]`}
              >
                <img className='w-full h-full object-cover' src='https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwaW1hZ2VzfGVufDB8MXwwfHx8MA%3D%3D'/>
              </div>
        </Carousel>
        {/* <FeedItem profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname="frontlinesmedia" media="https://images.unsplash.com/photo-1705112587579-e58ba5154e85?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <FeedItem profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname="frontlinesmedia" media="https://images.unsplash.com/photo-1705112587579-e58ba5154e85?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <FeedItem profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname="frontlinesmedia" media="https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4" type="video"/> */}
    </div>
  )
}

export default Feed