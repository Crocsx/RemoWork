'use client';

import { initializeAnalytics } from 'firebase/analytics';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  RemoteConfigSettings,
  fetchAndActivate,
  getRemoteConfig,
} from 'firebase/remote-config';

export const initFirebaseClient = async (
  config: FirebaseOptions,
  options?: {
    remoteConfig?: RemoteConfigSettings;
  }
): Promise<boolean> => {
  const firebaseClient = initializeApp(config);
  const remoteConfigInstance = getRemoteConfig(firebaseClient);
  initializeAnalytics(firebaseClient);

  if (options?.remoteConfig) {
    remoteConfigInstance.settings = {
      ...options.remoteConfig,
    };
  }

  try {
    await fetchAndActivate(remoteConfigInstance);
    return true;
  } catch (error) {
    return false;
  }
};
