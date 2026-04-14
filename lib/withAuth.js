'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { user, loading, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !token) {
        router.push('/login');
      }
    }, [loading, token, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl">Loading...</p>
        </div>
      );
    }

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
