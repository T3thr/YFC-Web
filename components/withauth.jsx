'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';

const withAuth = (WrappedComponent, redirectTo = '/') => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (session) {
        router.push(redirectTo); // Redirect if already signed in
      }
    }, [session, status, router]);

    if (status === 'loading' || session) {
      // Optionally, you can return a loading spinner or null
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
