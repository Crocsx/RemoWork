'use client';

import { useState, useEffect } from 'react';

export const useApiRequest = <R>({
  operation,
  onSuccess,
  onFailure,
}: {
  operation: () => Promise<R>;
  onSuccess?: (response: R) => void;
  onFailure?: (e: unknown) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<R>();

  const execute = async () => {
    setLoading(true);
    try {
      const response = await operation();
      setResponse(response);
      onSuccess?.(response);
    } catch (e) {
      setError(e);
      onFailure?.(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return { response, loading, error };
};
