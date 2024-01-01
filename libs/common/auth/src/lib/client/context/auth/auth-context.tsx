'use client';

import { createContext, useContext } from 'react';

import { User } from 'firebase/auth';

export type AuthContextType = {
  readonly self?: User | null;
  readonly authenticated: boolean;
  readonly verified: boolean;
};

export const defaultSelf: AuthContextType = {
  self: null,
  authenticated: false,
  verified: false,
};

export const AuthContext = createContext<AuthContextType>(defaultSelf);

export const useAuthCtx = () => {
  const { ...self } = useContext(AuthContext);
  return self;
};
