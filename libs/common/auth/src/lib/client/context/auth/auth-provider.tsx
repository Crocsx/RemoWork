'use client';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { LoadingOverlay } from '@mantine/core';
import * as Sentry from '@sentry/nextjs';
import { getAuth } from 'firebase/auth';

import { AuthContext } from './auth-context';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [user, loading] = useAuthState(getAuth());

  useEffect(() => {
    const { email, uid } = user || {};

    if (email) {
      Sentry.setUser({
        email,
        id: uid,
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        self: user,
        authenticated: !!user,
      }}
    >
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      {!loading && children}
    </AuthContext.Provider>
  );
};
