import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CreatePost from '@/components/posts/CreatePost';

export default function page() {
  return (
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  )
}
