import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostDetailProvider from '@/components/posts/PostDetailProvider';


export default async function SinglePostPage({ params }) {
  const { id } = await params;
  
  return (
    <ProtectedRoute>
      <PostDetailProvider id={id} />
    </ProtectedRoute>
  ) 
}
