'use client';

import { createContext, useContext } from 'react';

export type FirebaseContext = {
  readonly ready: boolean;
};

export const FirebaseContext = createContext<FirebaseContext>({ ready: false });

export function useFirebaseCtx(): FirebaseContext {
  return useContext(FirebaseContext);
}
