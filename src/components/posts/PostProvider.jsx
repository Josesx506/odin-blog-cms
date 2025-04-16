'use client'

import { axiosApi } from '@/api/axios';
import styles from "@/app/page.module.css";
import useAuth from '@/hooks/useAuth';
import { decodeJWT } from '@/utils/utils';
import { useEffect, useState } from 'react';
import PostThumbnail from './PostThumbnail';
import Link from 'next/link';
import EmptyMessage from '../EmptyMessage';


export default function PostProvider() {
  const [posts, setPosts] = useState([]);
  const { accessToken } = useAuth();
  const userPayload = decodeJWT(accessToken);
  
  useEffect(() => {
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        const res = await axiosApi.get('/v1/cms/posts', {signal: controller.signal})
        setPosts(res.data)
      } catch(err) {}
    }
    fetchPosts();
    return ()=>{
        controller.abort();
    }
  }, [])

  function handlePostDelete(postId) {
    if (!postId) return;
    // Remove the deleted post from state
    setPosts(prev => prev.filter(post => post.id !== postId));
  }

  return (
    <div className={styles.main}>
      {/* If there's a written post, display thumbnails or show empty message */}
      {posts.length>0 ? 

        posts.map(post => 
          <PostThumbnail  key={post.id} 
            user={userPayload} {...post}
            onPostDelete={handlePostDelete} />) :
        
        <EmptyMessage>
          <div>
            No post available, <Link style={{textDecoration:'underline',fontStyle:'oblique', fontWeight:'bold'}
              } href={'/create'}>write</Link> a new post
          </div>
        </EmptyMessage>}
    </div>
  )
}
