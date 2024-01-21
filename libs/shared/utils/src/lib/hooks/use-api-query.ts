'use client';

import { useEffect } from 'react';

import useSWR, { SWRConfiguration, Fetcher } from 'swr';

export const useApiRequest = <R = unknown, E = unknown>(
  key: Parameters<typeof useSWR>[0],
  {
    onSuccess,
    onFailure,
    fetcher,
    ...rest
  }: SWRConfiguration<R, E, Fetcher<R>> & {
    onSuccess?: (data?: R) => void;
    onFailure?: (error?: E) => void;
    fetcher?: Fetcher<R> | null;
  } = {}
) => {
  const {
    data,
    error,
    isValidating: loading,
  } = useSWR<R, E>(key, fetcher || null, rest);

  useEffect(() => {
    if (data !== undefined && onSuccess) {
      onSuccess(data);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (error !== undefined && onFailure) {
      onFailure(error);
    }
  }, [error, onFailure]);

  return { data, loading, error };
};
