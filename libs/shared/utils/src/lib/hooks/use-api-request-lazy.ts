'use client';

import { useState, useCallback } from 'react';

import { AxiosResponse } from 'axios';

export const useApiRequestLazy = <P, R>({
  operation,
  onSuccess,
  onFailure,
}: {
  operation: (payload: P) => Promise<AxiosResponse<R>>;
  onSuccess?: (response: AxiosResponse<R>) => void;
  onFailure?: (e: unknown) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(
    async (payload: P) => {
      setLoading(true);
      try {
        const result = await operation(payload);
        setLoading(false);
        onSuccess?.(result);
      } catch (e) {
        setError(e);
        setLoading(false);
        onFailure?.(e);
      }
    },
    [onFailure, onSuccess, operation]
  );

  return { loading, error, execute };
};
