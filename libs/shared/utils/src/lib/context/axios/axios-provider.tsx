'use client';

import { useEffect, useMemo } from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

import axios, { CreateAxiosDefaults } from 'axios';
import { getAuth } from 'firebase/auth';

import { AxiosContext } from './axios-context';

export const AxiosProvider = ({
  children,
  config,
}: {
  children: React.ReactNode | React.ReactNode[];
  config: CreateAxiosDefaults;
}) => {
  const instance = useMemo(() => axios.create(config), [config]);
  const [user] = useIdToken(getAuth());

  useEffect(() => {
    const setToken = async () => {
      const tokenId = await user?.getIdToken();
      instance.defaults.headers.common['Authorization'] = tokenId
        ? `Bearer ${tokenId}`
        : '';
    };
    setToken();
  }, [user, instance]);

  return (
    <AxiosContext.Provider
      value={{
        instance,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};
