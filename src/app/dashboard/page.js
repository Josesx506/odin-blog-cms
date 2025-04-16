import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostProvider from '@/components/posts/PostProvider';


export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <div style={{ display: 'grid', gap: '2em', width: '93%', margin: '0 auto' }}>
          <div>
            <h2  style={{paddingBottom:'0.5em'}}>Welcome to your Dashboard</h2>
            <em>View, Edit, and Publish your posts from here</em>
          </div>
          <PostProvider />
        </div>
      </ProtectedRoute>
    </div>
  )
}
