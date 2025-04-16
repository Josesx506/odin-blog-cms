import ProtectedRoute from '@/components/auth/ProtectedRoute';
import EditPost from '@/components/posts/EditPost';

export default async function page({params}) {
  const { id } = await params;
  return (
    <ProtectedRoute>
      <EditPost id={id} />
    </ProtectedRoute>
  )
}
