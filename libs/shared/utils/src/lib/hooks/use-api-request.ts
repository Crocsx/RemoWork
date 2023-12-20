'use client';

import { useState, useEffect } from 'react';

export const useApiRequest = <R>({
  operation,
}: {
  operation: () => Promise<R>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<R>();

  const execute = async () => {
    setLoading(true);
    try {
      const result = await operation();
      setLoading(false);
      setData(result);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('test');
    execute();
  }, []);

  return { data, loading, error };
};
