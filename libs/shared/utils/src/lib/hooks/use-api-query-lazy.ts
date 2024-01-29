'use client';

import { useState, useCallback, useEffect } from 'react';

import useSWR, { BareFetcher, SWRConfiguration } from 'swr';

import { useApiRequest } from './use-api-query';

export const useApiRequestLazy = <R>({
  onSuccess,
  onFailure,
  ...config
}: SWRConfiguration<R, Error, BareFetcher<R>> & {
  fetcher?: BareFetcher<R> | null;
  onSuccess?: (response?: R) => void;
  onFailure?: (error: unknown) => void;
} = {}) => {
  const [key, setKey] = useState<Parameters<typeof useSWR>[0] | null>(null);
  const [trigger, setTrigger] = useState(false);

  const { data, error, loading } = useApiRequest<R, Error>(
    trigger ? key : null,
    config
  );

  const execute = useCallback((newKey: Parameters<typeof useSWR>[0]) => {
    setKey(newKey);
    setTrigger(true);
  }, []);

  const reset = useCallback(() => {
    setKey(null);
    setTrigger(false);
  }, []);

  useEffect(() => {
    onFailure?.(error);
  }, [error, onFailure]);

  useEffect(() => {
    onSuccess?.(data);
  }, [data, onSuccess]);

  return { data, loading, error, execute, reset };
};
