'use client';

import { useEffect } from 'react';

import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

async function sendRequest<Payload, Response>(
  key: string,
  options: { arg: Payload; method?: string }
): Promise<Response> {
  const { arg: payload, method = 'POST' } = options;
  const response = await fetch(key, {
    method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export const useApiMutation = <
  Payload = unknown,
  Response = unknown,
  Error = unknown
>(
  key: Parameters<typeof useSWRMutation>[0],
  {
    method = 'POST',
    onSuccess,
    onFailure,
    fetcher = (k: string, args: { arg: Payload }) =>
      sendRequest<Payload, Response>(k, { method, ...args }),
    ...rest
  }: SWRMutationConfiguration<Response, Error, typeof key, Payload> & {
    method?: string;
    onSuccess?: (response?: Response) => void;
    onFailure?: (e: unknown) => void;
  } = {}
) => {
  const {
    trigger,
    error,
    isMutating: loading,
    data,
  } = useSWRMutation<Response, Error, typeof key, Payload>(key, fetcher, rest);

  useEffect(() => {
    if (data !== undefined) {
      onSuccess?.(data);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (error !== undefined) {
      onFailure?.(error);
    }
  }, [error, onFailure]);

  return { data, loading, error, trigger };
};
