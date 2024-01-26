import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { posts } from '../constants/data'
import { Link, useLocation } from 'react-router-dom'
import newRequest from '../utils/newReq';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await newRequest.get(`/posts/${cat}`)
        setPosts(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
              {/* <img src={post.img} alt='post_img'/> */} 
              <img src={`../upload/${post.img}`} alt='post_img'/>
            </div>
            <div className='content'>
              <Link className='link' to={`post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
                <br/>
                <p>{getText(post.desc)}</p>
                <br/>
              <Link className='link' to={`post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home