'use client'

import { axiosApi } from '@/api/axios';
import CommentThumbnail from '@/components/comments/CommentThumbnails';
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/post.module.css';
import { createCommentHandler } from '@/utils/commentHandlers';
import { deletePostDetails } from '@/utils/postHandlers';
import { dateFormatter, decodeJWT } from '@/utils/utils';
import Form from 'next/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ProfileAvatars from '../ProfileAvatars';


export default function PostDetailProvider({ id }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const user = decodeJWT(accessToken);
  const newCommentRef = useRef("");
  const router = useRouter();


  useEffect(() => {
    const controller = new AbortController();
    async function fetchPostDetails() {
      try {
        const res = await axiosApi.get(`/v1/cms/posts/${id}`,
          { signal: controller.signal })
        setPost(res.data)
        if (post && post.comments) {
          setComments(res.data.comments);
        }
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

  // State logic and handlers to minimize complete re-rendering of the entire component
  function handleCommentInsert(newComment) {
    // Add the new comment to state
    setPost(prevPost => ({
      ...prevPost,
      comments: [{ ...newComment }, ...prevPost.comments]
    }));
  }

  async function handlePostDelete(e) {
    e.preventDefault();
    await deletePostDetails({ postId: id });
    router.push('/dashboard');
  }

  function handleCommentDelete(commentId) {
    // Remove the deleted comment from state
    setPost(prevPost => ({
      ...prevPost,
      comments: prevPost.comments.filter(comment => comment.id !== commentId)
    }));
  }

  // Comment logic and handlers
  function cancelComment(e) {
    e.preventDefault();
    newCommentRef.current.value = "";
  }

  async function postNewComment(e) {
    e.preventDefault();
    await createCommentHandler({
      commentRef: newCommentRef,
      postId: id, onCommentCreate: handleCommentInsert
    })
  }

  let editPermission = false;
  if (!loading && post) {
    editPermission = (user.id === post.authorId);
  }

  return (post ?
    <div className={styles.viewPost}>
      {/* View Post */}
      <div className={styles.postView}>
        <h2 className={styles.Title}>
          {post.title}
        </h2>
        <div className={styles.postDetails}>
          <div className={styles.authorCntr}>
            <ProfileAvatars name={post.author} />
            <h3 className={styles.Subtitle}>
              {post.author}
            </h3>
          </div>
          <div>{dateFormatter(post.updatedAt, 'monthNameDay')}</div>
        </div>
        <div className={styles.postDetailsBody} dangerouslySetInnerHTML={{ __html: post.body }}></div>
        <div className={styles.actionBtns}>
          {editPermission && 
            <button type='submit'>
              <Link href={`/dashboard/${id}/edit`}>Edit</Link>
            </button>
          }
          <button onClick={handlePostDelete} style={{ color: "red" }} type='submit'>Delete</button>
        </div>
      </div>

      {/* Handle Comments */}
      <div className={styles.commentCntr}>
        <h4 id='comments'>Comments</h4>

        {/* Create new Comment */}
        <Form >
          <div className={styles.newCmtInput}>
            <label htmlFor="commentBody"></label>
            <textarea ref={newCommentRef} rows={2} name="commentBody" id="commentBody"
              placeholder='What are your thoughts?'></textarea>
          </div>
          <div className={styles.actionBtns}>
            <button onClick={cancelComment}>Cancel</button>
            <button onClick={postNewComment} type='submit'>Respond</button>
          </div>
        </Form>

        {/* Edit Existing Comments */}
        {
          post.comments.length === 0 ?
            <div>Comments unavailable for this post</div> :
            post.comments.map((comment) => {
              return <CommentThumbnail key={comment.id} user={user} authorId={comment.authorId}
                postId={id} id={comment.id} username={comment.author} comment={comment.body}
                updatedAt={comment.updatedAt}
                onCommentDelete={handleCommentDelete} />
            })
        }
      </div>
    </div> :
    <div>Loading...</div>
  )
}
