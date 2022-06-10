import React, { createContext, FC, useState } from 'react';

import { DEFAULT_BACKEND_URL, DEFAULT_QUERY_STRING, DEFAULT_IMAGES_PER_QUERY } from '../utils';

type ProviderProps = {
  backendURL: string;
  setBackendURL: (url: string) => void;
  queryString: string;
  setQueryString: (url: string) => void;
  isValidURL: boolean;
  setIsValidURL: (isValid: boolean) => void;
  validatedBackendURL: boolean | string;
  imagesPerQuery: number;
  setImagesPerQuery: (limit: number) => void;
};

const DefaultContext = {
  backendURL: '',
  setBackendURL: () => {},
  queryString: '',
  setQueryString: () => {},
  isValidURL: false,
  setIsValidURL: () => {},
  validatedBackendURL: '',
  imagesPerQuery: 0,
  setImagesPerQuery: () => {},
};

// Create context
export const MyFormContext = createContext<ProviderProps>(DefaultContext);

type Props = {
  children?: JSX.Element;
};

// Example implementing Provider around consumer
export const MyFormProvider: FC<Props> = ({ children }) => {
  const [backendURL, setBackendURL] = useState<string>(DEFAULT_BACKEND_URL);
  const [imagesPerQuery, setImagesPerQuery] = useState(DEFAULT_IMAGES_PER_QUERY);
  const [queryString, setQueryString] = useState<string>(DEFAULT_QUERY_STRING);

  const [isValidURL, setIsValidURL] = useState(false);

  const value = {
    queryString,
    setQueryString,
    backendURL,
    setBackendURL,
    isValidURL,
    setIsValidURL,
    validatedBackendURL: isValidURL && backendURL,
    imagesPerQuery,
    setImagesPerQuery,
  };

  return <MyFormContext.Provider value={value}>{children}</MyFormContext.Provider>;
};

MyFormContext.displayName = 'MyFormContext';

export default MyFormContext;
