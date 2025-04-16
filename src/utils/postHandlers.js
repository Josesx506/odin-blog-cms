// handlers are for updating state or other state/memory features

import { toast } from 'react-hot-toast';
import { handleCreatePost, handleDeletePost, handleEditPost } from './postActions';


async function createPostHandler({
  titleRef, bodyRef, publishedRef, recordPostId
}) {
  const title = titleRef.current.value.trim();
  const body = bodyRef.current.value.trim();
  const published = publishedRef.current.checked;

  if (!title || !body) {
    toast.error('Title and body required');
    return;
  }
  const post = { title, body, published };

  try {
    const newPost = await handleCreatePost({ body: post });
    toast.success('Post saved');
    recordPostId(newPost.id)
  } catch(err) {
    toast.error(err.message || 'Create Post Failed');
  }
}


async function editPostHandler({
  titleRef, bodyRef, publishedRef, postId
}) {
  const title = titleRef.current.value.trim();
  const body = bodyRef.current.value.trim();
  const published = publishedRef.current.checked;

  if (!title || !body) {
    toast.error('Title and body required');
    return;
  }
  const post = { title, body, published };

  try {
    const updatedPost = await handleEditPost({ postId, body: post });
    toast.success('Post updated');
  } catch(err) {
    toast.error(err.message || 'Post Edit Failed');
  }
}


async function deletePostDetails({
  postId 
}) {
  try {
    await handleDeletePost({ postId });
    toast.success('Post deleted');
  } catch (err) {
    toast.error(err.message || 'Delete Failed');
  }
}


async function deletePostThumbnailHandler({
  postId, onPostDelete,
}) {
  try {
    await handleDeletePost({ postId });
    onPostDelete?.(postId);    // Send a signal to the PostProvider component to unmount this post thumbnail
    toast.success('Post deleted');
  } catch (err) {
    toast.error(err.message || 'Delete Failed');
  }
}


export { createPostHandler, deletePostDetails, deletePostThumbnailHandler, editPostHandler };

