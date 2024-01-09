'use client';

import { useEffect } from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

import { LoadingOverlay } from '@mantine/core';
import * as Sentry from '@sentry/nextjs';
import { getAuth } from 'firebase/auth';

import { FetchInstance } from '~workspace/lib/shared/utils';

import { AuthContext } from './auth-context';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [user, loading] = useIdToken(getAuth());

  useEffect(() => {
    const { email, uid } = user || {};

    if (email) {
      Sentry.setUser({
        email,
        id: uid,
      });
    }
  }, [user]);

  useEffect(() => {
    const setToken = async () => {
      const tokenId = (await user?.getIdToken()) || '';
      FetchInstance.headers.set('Authorization', `Bearer ${tokenId}`);
    };
    setToken();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        self: user,
        authenticated: !!user,
        verified: user?.emailVerified || false,
      }}
    >
      <LoadingOverlay
        bg="secondary.0"
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {!loading && children}
    </AuthContext.Provider>
  );
};
