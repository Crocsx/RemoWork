import { createQueryString } from '../utils';

export class FetchError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown
  ) {
    super(`HTTP Error ${status}: ${statusText}`);
  }
}

const timeout = (promise: Promise<Response>, ms = 5000) => {
  return new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, ms);
    promise.then(resolve, reject);
  });
};

export class FetchInstance {
  static headers: Headers = new Headers();
  static endpoint: string | URL = '';

  static initialize(endpoint: string | URL, initHeaders?: HeadersInit) {
    FetchInstance.headers = new Headers({
      'Content-Type': 'application/json',
      ...initHeaders,
    });

    FetchInstance.endpoint = endpoint;
  }

  private static async request<T>(
    path: string | URL,
    method: string,
    payload?: unknown,
    init?: RequestInit
  ): Promise<T> {
    const headers = { ...FetchInstance.headers, ...init?.headers };

    const options: RequestInit = {
      method,
      headers,
      ...init,
    };

    let url = `${FetchInstance.endpoint}${path}`;

    if (payload && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(payload);
    }

    if (payload && method === 'GET') {
      url = `${url}?${createQueryString(payload)}`;
    }

    const response = await timeout(fetch(url, options));

    if (!response.ok) {
      const body = await response.text();
      throw new FetchError(response.status, response.statusText, body);
    }

    return (await response.json()) as T;
  }

  static get<T>(
    input: string | URL,
    queryString?: unknown,
    init?: RequestInit
  ): Promise<T> {
    return FetchInstance.request<T>(input, 'GET', queryString, init);
  }

  static post<T>(
    input: string | URL,
    payload: unknown,
    init?: RequestInit
  ): Promise<T> {
    return FetchInstance.request<T>(input, 'POST', payload, init);
  }

  static put<T>(
    input: string | URL,
    payload: unknown,
    init?: RequestInit
  ): Promise<T> {
    return FetchInstance.request<T>(input, 'PUT', payload, init);
  }

  static delete<T>(input: string | URL, init?: RequestInit): Promise<T> {
    return FetchInstance.request<T>(input, 'DELETE', null, init);
  }
}
