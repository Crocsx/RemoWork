'use client';

import { useState, useCallback } from 'react';

export const useApiRequestLazy = <P, R>({
  operation,
  onSuccess,
  onFailure,
}: {
  operation: (payload: P) => Promise<R>;
  onSuccess?: (response: R) => void;
  onFailure?: (e: unknown) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(
    async (payload: P) => {
      setLoading(true);
      try {
        const result = await operation(payload);
        onSuccess?.(result);
      } catch (e) {
        setError(e);
        onFailure?.(e);
      } finally {
        setLoading(false);
      }
    },
    [onFailure, onSuccess, operation]
  );

  return { loading, error, execute };
};
