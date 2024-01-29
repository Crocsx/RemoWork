'use client';

import React, { useEffect, useState } from 'react';

import { LoadingOverlay } from '@mantine/core';
import { FirebaseOptions } from 'firebase/app';
import { RemoteConfigSettings } from 'firebase/remote-config';

import { FirebaseContext } from './firebase-context';
import { initFirebaseClient } from '../factory';

interface FirebaseProviderProps {
  config: FirebaseOptions;
  remoteConfig?: RemoteConfigSettings;
}

export const FirebaseProvider = ({
  config,
  remoteConfig,
  children,
}: React.PropsWithChildren<FirebaseProviderProps>) => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        await initFirebaseClient(config);

        setReady(true);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setReady(false);
      }
    })();
  }, [config, remoteConfig]);

  return (
    <FirebaseContext.Provider
      value={{
        ready,
      }}
    >
      <LoadingOverlay visible={loading || !ready} bg="secondary.0" />
      {ready && children}
    </FirebaseContext.Provider>
  );
};
