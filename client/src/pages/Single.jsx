import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { icon } from '../constants/data'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
import newRequest from '../utils/newReq'

const Single = () => {

  const [post, setPost] = useState({});

  const postId = useLocation().pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext); 

  const navigate = useNavigate();

  // console.log(postId);

  useEffect(() => { 
    const fetchData = async () => {
      try{
        const res = await newRequest.get(`/posts/${postId}`)
        setPost(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[postId]);

  const handleDelete = async () => {
    try{
      const res = await newRequest.delete(`/posts/${postId}`)
      navigate('/')
    }catch(err){
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post.img}`} alt="" /> 
        <div className='user'>
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className='info'>
            <span>{post?.username} </span>
            <p>posted {moment(post.date).fromNow()} </p>
          </div>
          { currentUser.username === post.username &&
            (<div className='edit'>
              <Link to={`/write?edit=2`} state={post}>
                <img src={icon.edit} alt="" />
              </Link>
                <img onClick={handleDelete} src={icon.delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <br />
        {getText(post.desc)}
      </div> 
      <div className='menu'>
        <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single