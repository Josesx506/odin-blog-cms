import styles from '@/styles/thumbnail.module.css';
import Link from 'next/link';
import { DeleteContentBtn, EditContentBtn, ViewCommentsBtn } from '../Buttons';
import { dateFormatter } from '@/utils/utils';
import { redirect } from 'next/navigation';
import { deletePostThumbnailHandler } from '@/utils/postHandlers';
import DOMPurify from 'dompurify';

export default function PostThumbnail({
  id, user, author, authorId,  body, updatedAt, comments, published, title, 
  onPostDelete,
}) {
  const editPermission = (user.id === authorId);
  const delPermission = (user.role === 'ADMIN' || user.id === authorId);

  function navigateEdit() {
    redirect(`/dashboard/${id}/edit`)
  }

  async function deleteComment(e) {
    e.preventDefault();
    await deletePostThumbnailHandler({ postId: id, onPostDelete, })
  }
  const purifyOptions = {ALLOWED_TAGS:['p']}

  return (
    <div>
      <div className={styles.author}>
        <span>Written by</span> <Link href={`/author/${authorId}`}>{author}</Link>
      </div>
      <Link className={styles.thumbnailTitle} href={`/dashboard/${id}`}>
        <h3>{title}</h3>
      </Link>
      <div className={styles.thumbnailBody} dangerouslySetInnerHTML={
        { __html: DOMPurify.sanitize(body,purifyOptions) }}></div>
      {/* {body} */}
      
      <div className={styles.thumbnailFooter}>
        <div className={styles.footerInfo}>
          <div style={{fontStyle:"italic"}}>{dateFormatter(updatedAt)}</div>
          <ViewCommentsBtn className={`${styles.blogComments} ${styles.scaleBtn}`} 
            href={`/dashboard/${id}#comments`} numComments={comments.length}/>
        </div>
        <div className={styles.footerInfo}>
            {editPermission && <EditContentBtn published={published} className={styles.scaleBtn} onClick={navigateEdit}/>}
            {delPermission && <DeleteContentBtn className={styles.scaleBtn} onClick={deleteComment}/>}
          </div>
      </div>
    </div>
  )
}
