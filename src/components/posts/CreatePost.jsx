'use client';

import TinyMCE from '@/components/posts/TinyMCE';
import styles from '@/styles/post.module.css';
import { createPostHandler, editPostHandler } from '@/utils/postHandlers';
import Form from 'next/form';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ContainedButton } from '../Buttons';

export default function CreatePost() {
  const blogTitleRef = useRef("");
  const editorRef = useRef(null);
  const blogPublishRef = useRef(false);
  const [postId, setPostId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  function clearForm(e) {
    e.preventDefault();
    blogTitleRef.current.value = '';
    editorRef.current.setContent('');
  }

  async function saveBlogPost(e) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const bodyContent = editorRef.current ? editorRef.current.getContent() : '';
      const bodyRefMock = { current: { value: bodyContent } };

      if (!postId) {
        // Create new post
        await createPostHandler({
          titleRef: blogTitleRef,
          bodyRef: bodyRefMock,
          publishedRef: blogPublishRef,
          recordPostId: setPostId
        })
      } else {
        await editPostHandler({
          titleRef: blogTitleRef,
          bodyRef: bodyRefMock,
          publishedRef: blogPublishRef,
          postId
        })
      }
    } catch (err) {
      toast.error(err.message || "Failed to save post");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditorChange(content) {
    setEditorContent(content);
  };

  return (
    <div className={styles.createPost}>
      <Form className={styles.postForm} onSubmit={saveBlogPost}>
        <div className={styles.postTextContainers}>
          <label htmlFor='title'></label>
          <input ref={blogTitleRef} id='title'
            placeholder='Enter your title...' name='title'></input>
        </div>

        <div className={styles.postTextContainers}>
          <TinyMCE editorContent={editorContent} editorRef={editorRef}
            handleEditorChange={handleEditorChange} />
        </div>

        <div className={styles.postPublish} >
          <label htmlFor='published'>Publish this draft?</label>
          <input ref={blogPublishRef} id='published' type='checkbox' name='published'></input>
        </div>
        <div className={styles.actionBtns}>
          <ContainedButton onClick={clearForm} backgroundColor='lightgray' color='aliceblue'>Clear</ContainedButton>
          <ContainedButton>Save</ContainedButton>
        </div>
      </Form>
      <em><b style={{ color: 'tomato' }}>Note:</b> Title and body values are required. Special characters are escaped.</em>
    </div>
  )
}
