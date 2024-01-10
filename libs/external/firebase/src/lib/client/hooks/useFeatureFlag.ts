'use client';
import { useContext } from 'react';

import * as Sentry from '@sentry/react';
import {
  getValue,
  getBoolean,
  getNumber,
  getString,
  Value,
  getRemoteConfig,
} from 'firebase/remote-config';

import { FirebaseContext } from '../context';

export type FeatureFlagAs = 'string' | 'number' | 'boolean' | 'json';

export interface IFeatureFlag<T> {
  value: T;
  raw: Value;
}

export interface UseFeatureFlagOptions<T extends FeatureFlagAs = 'boolean'> {
  as: T;
}

export type FeatureFlagAsTypeCheck<T extends FeatureFlagAs> = T extends 'string'
  ? string
  : T extends 'number'
  ? number
  : boolean;

export function useFeatureFlag(
  key: string,
  options?: UseFeatureFlagOptions<'boolean'>
): IFeatureFlag<boolean> | undefined;

export function useFeatureFlag(
  key: string,
  options?: UseFeatureFlagOptions<'string'>
): IFeatureFlag<string> | undefined;

export function useFeatureFlag(
  key: string,
  options?: UseFeatureFlagOptions<'number'>
): IFeatureFlag<number> | undefined;

export function useFeatureFlag<T extends FeatureFlagAs>(
  key: string,
  options?: UseFeatureFlagOptions<T>
): IFeatureFlag<FeatureFlagAsTypeCheck<T>> | undefined;

export function useFeatureFlag(
  key: string,
  options?: UseFeatureFlagOptions<FeatureFlagAs>
) {
  const context = useContext(FirebaseContext);

  if (context === null) {
    throw new Error('No Firebase Provider');
  }

  if (!context.ready) {
    return undefined;
  }

  try {
    const raw = getValue(getRemoteConfig(), key);

    if (options?.as === 'string') {
      return {
        value: getString(getRemoteConfig(), key),
        raw,
      } as IFeatureFlag<string>;
    }

    if (options?.as === 'number') {
      return {
        value: getNumber(getRemoteConfig(), key),
        raw,
      } as IFeatureFlag<number>;
    }

    if (options?.as === 'json') {
      let objectValue = {};
      try {
        objectValue = JSON.parse(getString(getRemoteConfig(), key));
      } catch (error) {
        Sentry.captureException(
          `parsing of flag ${key} failed with error ${error}`
        );
      }

      return {
        value: objectValue,
        raw,
      } as IFeatureFlag<Record<string, string>>;
    }

    return {
      value: getBoolean(getRemoteConfig(), key),
      raw,
    } as IFeatureFlag<boolean>;
  } catch (error) {
    return undefined;
  }
}
