import React, { useEffect, useState } from 'react'
import FeedItem from './FeedItem'
import { getPosts } from '../utils/postOpertions';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      console.log(posts);
    });
  },[])
  return (
    <div className='w-[470px] flex-1 self-center'>
        {posts && posts.map((post) => {
          return <FeedItem key={post.id} profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname={post.data.username} media={post.data.url}/>
        })}
        {/* <FeedItem profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname="frontlinesmedia" media="https://images.unsplash.com/photo-1705112587579-e58ba5154e85?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <FeedItem profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname="frontlinesmedia" media="https://images.unsplash.com/photo-1705112587579-e58ba5154e85?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        <FeedItem profile="https://media.4-paws.org/b/e/2/d/be2d88ceb9613ac5066bd11dd950faaf2671bef7/VIER%20PFOTEN_2019-03-15_001-1998x1999-600x600.jpg" uname="frontlinesmedia" media="https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4" type="video"/> */}
    </div>
  )
}

export default Feed