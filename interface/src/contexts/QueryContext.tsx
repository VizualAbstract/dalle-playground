import React, { createContext, FC, useState } from 'react';

import { DEFAULT_BACKEND_URL, DEFAULT_QUERY_STRING, DEFAULT_IMAGES_PER_QUERY } from 'utils';

type ProviderProps = {
  serverURL: string;
  setServerURL: (url: string) => void;
  queryString: string;
  setQueryString: (url: string) => void;
  isValidURL: boolean;
  setIsValidURL: (isValid: boolean) => void;
  validatedBackendURL: boolean | string;
  imagesPerQuery: number;
  setImagesPerQuery: (limit: number) => void;
};

// Create context
const QueryContext = createContext<ProviderProps>({} as ProviderProps);

const QueryContextProvider: FC<{
  children?: JSX.Element;
}> = ({ children }) => {
  const [serverURL, setServerURL] = useState<string>(DEFAULT_BACKEND_URL);
  const [imagesPerQuery, setImagesPerQuery] = useState(DEFAULT_IMAGES_PER_QUERY);
  const [queryString, setQueryString] = useState<string>(DEFAULT_QUERY_STRING);

  const [isValidURL, setIsValidURL] = useState(false);

  const value = {
    queryString,
    setQueryString,
    serverURL,
    setServerURL,
    isValidURL,
    setIsValidURL,
    validatedBackendURL: isValidURL && serverURL,
    imagesPerQuery,
    setImagesPerQuery,
  };

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};

QueryContext.displayName = 'QueryContext';

QueryContextProvider.displayName = 'QueryContextProvider';

export { QueryContext, QueryContextProvider };
