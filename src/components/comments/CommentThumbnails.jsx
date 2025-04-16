'use client';

import styles from '@/styles/comment.module.css';
import { deleteCommentHandler,editCommentHandler } from '@/utils/commentHandlers';
import Form from 'next/form';
import { useRef, useState } from 'react';
import { DeleteContentBtn, EditContentBtn } from '../Buttons';
import { dateFormatter } from '@/utils/utils';

export default function CommentThumbnail({ 
    user, postId, id, authorId, username, comment,
    updatedAt, onCommentDelete,
 }) {
  const [commentText, setCommentText] = useState(comment);
  const [editComment, setEditComment] = useState(false);
  const editCommentRef = useRef(comment);

  const editPermission = (user.id === authorId);
  const delPermission = (user.role === 'ADMIN' || user.id === authorId);

  function toggleEdit(e) {
    e.preventDefault();
    setEditComment(!editComment);
  }

  async function patchEditComment(e) {
    e.preventDefault();
    await editCommentHandler ({
        commentRef: editCommentRef, postId,
        commentId: id, setCommentText,
        openEditForm: setEditComment
    })
  }

  async function deleteComment(e) {
    e.preventDefault();
    await deleteCommentHandler({ postId, commentId: id, onCommentDelete, })
  }

  return editComment ? (
        <div className={styles.commentThumbnail}>
          <div className={styles.commentHeader}>
            <div className={styles.commentUser}>{username}</div>
            <div className={styles.commentDate}>{dateFormatter(updatedAt)}</div>
          </div>
          <div className={styles.commentBody}>
            <Form>
              <div className={styles.editCmtInput}>
                <label htmlFor="commentBody"></label>
                <textarea ref={editCommentRef} rows={2} name="commentBody" id="commentBody" defaultValue={commentText}></textarea>
              </div>
              <div className={styles.editCmtActions}>
                <button onClick={toggleEdit}>Cancel</button>
                <button onClick={patchEditComment} type='submit'>Submit</button>
              </div>
            </Form>
          </div>
        </div>
    ) : (
        <div className={styles.commentThumbnail}>
        <div className={styles.commentHeader}>
          <div className={styles.commentUser}>{username}</div>
          <div className={styles.commentDate}>{dateFormatter(updatedAt)}</div>
        </div>
          <div className={styles.commentBody}>
            {commentText}
          </div>
          <div className={styles.commentActions}>
            {editPermission && <EditContentBtn published={true} className={styles.scaleBtn} onClick={toggleEdit}/>}
            {delPermission && <DeleteContentBtn className={styles.scaleBtn} onClick={deleteComment}/>}
          </div>
        </div>
    )
}
