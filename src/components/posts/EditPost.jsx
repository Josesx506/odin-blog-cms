'use client'

import { axiosApi } from '@/api/axios';
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/post.module.css';
import { editPostHandler } from '@/utils/postHandlers';
import { decodeJWT } from '@/utils/utils';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ContainedButton } from '../Buttons';
import TinyMCE from '@/components/posts/TinyMCE';


export default function EditPost({ id }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const userId = decodeJWT(accessToken).id;
  const router = useRouter();
  const blogTitleRef = useRef("");
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const blogPublishRef = useRef(false);


  useEffect(() => {
    const controller = new AbortController();
    async function fetchPostDetails() {
      try {
        const res = await axiosApi.get(`/v1/cms/posts/${id}`,
          { signal: controller.signal })
        
        if (userId !== res.data.authorId) {
          router.push(`/unauthorized?message=${encodeURIComponent("You don't have permission to edit this post")}`)
        }
        setPost({...res.data});
      
      } catch (err) {
        if (err.response?.status === 403) {
          setError('Unauthorized');
          router.push(`/unauthorized?message=${encodeURIComponent(err.response.data?.message)}`);
        }
        else if (err.response?.status === 404) {
          router.push('/notFound')
        } else {
          setError('other-error');
        }
      
      } finally {
        setLoading(false);
      }
    }
    fetchPostDetails();
    return () => {
      controller.abort();
    }
  }, [id])

  function clearForm(e) {
    e.preventDefault();
    blogTitleRef.current.value = '';
    editorRef.current.setContent('');
  }

  function handleEditorChange(content) {
    setEditorContent(content);
  };

  async function updateBlogPost(e) {
    e.preventDefault();
    const bodyContent = editorRef.current ? editorRef.current.getContent() : '';
    const bodyRefMock = { current: { value: bodyContent } };

    await editPostHandler({
      titleRef: blogTitleRef,
      bodyRef: bodyRefMock,
      publishedRef: blogPublishRef,
      postId: id
    })
  }

  return (post ?
    
    <div className={styles.createPost}>
      <Form className={styles.postForm} onSubmit={updateBlogPost}>
        <div className={styles.postTextContainers}>
          <label htmlFor='title'></label>
          <input ref={blogTitleRef} id='title' defaultValue={post.title}
            placeholder='Enter your title...' name='title'></input>
        </div>
        <div className={styles.postTextContainers}>
          <TinyMCE editorContent={editorContent} editorRef={editorRef}
            handleEditorChange={handleEditorChange} initialValue={post.body} />
        </div>
        <div className={styles.postPublish} >
          <label htmlFor='published'>Publish this draft?</label>
          <input ref={blogPublishRef} id='published' type='checkbox' name='published' defaultChecked={post.published}></input>
        </div>
        <div className={styles.actionBtns}>
          <ContainedButton onClick={clearForm} backgroundColor='lightgray' color='aliceblue'>Clear</ContainedButton>
          <ContainedButton>Save</ContainedButton>
        </div>
      </Form>
      <em><b style={{ color: 'tomato' }}>Note:</b> Title and body values are required. Special characters are escaped.</em>
    </div> :

    <div>Loading...</div>
  )
}
