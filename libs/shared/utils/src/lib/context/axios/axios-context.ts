'use client';

import { createContext, useContext } from 'react';

import axios, { AxiosInstance } from 'axios';

export type AxiosContextType = {
  readonly instance: AxiosInstance;
};

export const defaultSelf: AxiosContextType = {
  instance: axios.create({}),
};

export const AxiosContext = createContext<AxiosContextType>(defaultSelf);

export const useAxiosCtx = () => {
  const { instance } = useContext(AxiosContext);
  return instance;
};
