// Actions are for executing requests

import { axiosApi } from '@/api/axios';
import { sanitizeSimpleInputs } from './utils';

// Sends POST request to create a comment
async function handleCreateComment({ postId, body }) {
  const sanitized = sanitizeSimpleInputs({ body });
  const url = `/v1/cms/posts/${postId}/comments`;
  const resp = await axiosApi.post(url, sanitized);
  return resp?.data;
}

// Sends PATCH request to edit a comment
async function handleEditComment({ postId, commentId, body }) {
  const sanitized = sanitizeSimpleInputs({ body });
  const url = `/v1/cms/posts/${postId}/comments/${commentId}`;
  const resp = await axiosApi.patch(url, sanitized);
  return resp.data?.body;
}

// Sends DELETE request to remove a comment
async function handleDeleteComment({ postId, commentId }) {
  const url = `/v1/cms/posts/${postId}/comments/${commentId}`;
  const resp = await axiosApi.delete(url);
  return resp;
}


export { handleCreateComment, handleDeleteComment, handleEditComment };
