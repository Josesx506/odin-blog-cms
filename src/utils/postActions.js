// Actions are for executing requests

import { axiosApi } from '@/api/axios';
import { sanitizeSimpleInputs } from './utils';

// Sends POST request to create a blog post
async function handleCreatePost({ body }) {
  const sanitized = sanitizeSimpleInputs(body);
  const url = `/v1/cms/posts`;
  const resp = await axiosApi.post(url, sanitized);
  return resp?.data;
}

// Sends PATCH request to edit a blog post
async function handleEditPost({ postId, body }) {
  const sanitized = sanitizeSimpleInputs( body );
  const url = `/v1/cms/posts/${postId}`;
  const resp = await axiosApi.patch(url, sanitized);
  return resp.data?.body;
}

// Sends DELETE request to remove a blog post
async function handleDeletePost({ postId }) {
  const url = `/v1/cms/posts/${postId}`;
  const resp = await axiosApi.delete(url);
  return resp;
}


export { handleCreatePost, handleDeletePost, handleEditPost };
