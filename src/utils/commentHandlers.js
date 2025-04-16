// handlers are for updating state or other state/memory features

import { toast } from 'react-hot-toast';
import { handleCreateComment, handleDeleteComment, handleEditComment } from './commentActions';

async function createCommentHandler({
  commentRef, postId, onCommentCreate
}) {
  const body = commentRef.current.value.trim();

  if (!body) {
    toast.error('Comment cannot be empty');
    return;
  }

  try {
    const newComment = await handleCreateComment({ postId, body });
    onCommentCreate?.(newComment);    // Send a signal to the parent PostProvider component to mount this comment
    commentRef.current.value = '';
    toast.success('Comment created');
  } catch(err) {
    toast.error(err.message || 'Create Failed');
  }
}

async function editCommentHandler({ 
  commentRef, postId, commentId,
  setCommentText, openEditForm,
}) {
  const body = commentRef.current.value.trim();

  if (!body) {
    toast.error('Comment cannot be empty');
    return;
  }

  try {
    const updatedBody = await handleEditComment({ postId, commentId, body });
    setCommentText(updatedBody); // Update state of comment text in comment component to prevent re-rendering
    commentRef.current.value = '';
    openEditForm(false);
    toast.success('Comment updated');
  } catch (err) {
    toast.error(err.message || 'Update Failed');
    openEditForm(false);
  }
}

async function deleteCommentHandler({
  postId, commentId, onCommentDelete,
}) {
  try {
    await handleDeleteComment({ postId, commentId });
    onCommentDelete?.(commentId);    // Send a signal to the parent PostProvider component to unmount this comment
    toast.success('Comment deleted');
  } catch (err) {
    toast.error(err.message || 'Delete Failed');
  }
}

export { createCommentHandler, deleteCommentHandler, editCommentHandler };
