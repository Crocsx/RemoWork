'use client';

import { useState, useEffect } from 'react';

import { AxiosResponse } from 'axios';

export const useApiRequest = <R>({
  operation,
}: {
  operation: () => Promise<AxiosResponse<R>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<AxiosResponse<R>>();

  const execute = async () => {
    setLoading(true);
    try {
      setResponse(await operation());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return { response, loading, error };
};
