'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push('/signin');
    }
  }, [accessToken, loading]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!accessToken) {
    return null;
  }


  return children
}