import React, { memo, useCallback, useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { Container, Grid } from '@material-ui/core';

import { fetchDalle } from 'api/dalle';
import Gallery from 'components/Gallery';
import Header from 'components/Layout/Header';
import MessageHandler from 'components/Layout/MessageHandler';
import QueryForm from 'components/QueryForm';
import QueryTimer from 'components/QueryTimer';
import { QueryContext } from 'contexts/QueryContext';

const App = () => {
  const { serverURL, queryString, validatedBackendURL, imagesPerQuery } = useContext(QueryContext);

  // Query Timer
  const [enableTimer, setEnableTimer] = useState(false);
  const [queryTime, setQueryTime] = useState(0);

  // Query results
  const [enableQuery, setEnableQuery] = useState(false);
  const [apiError, setApiError] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);

  const handleQuery = useCallback(() => {
    setEnableTimer(true);
    setApiError('');

    return fetchDalle({
      url: serverURL,
      query: queryString,
      limit: imagesPerQuery,
    });
  }, [serverURL, queryString, imagesPerQuery]);

  const handleSettled = useCallback(() => {
    setEnableTimer(false);
    setEnableQuery(false);
  }, []);

  const handleSuccess = useCallback((response) => {
    // Set final execution time
    setQueryTime(response.executionTime);
    // Display results
    setGeneratedImages(response.generatedImgs);
  }, []);

  const handleError = useCallback((error: Error) => {
    setQueryTime(0);

    window.console.log('Error querying DALL-E service.', error);

    if (error.message === 'Timeout') {
      setApiError(
        'Timeout querying DALL-E service (>1min). Consider reducing the images per query or use a stronger backend.',
      );
    } else {
      setApiError('Error querying DALL-E service. Check your backend server logs.');
    }
  }, []);

  const { isFetching, isSuccess, refetch, isError } = useQuery(
    ['DALLE', serverURL, queryString, imagesPerQuery],
    () => handleQuery(),
    {
      enabled: enableQuery,
      retry: false,
      onSettled: handleSettled,
      onSuccess: handleSuccess,
      onError: handleError,
    },
  );

  const handleOnEnter = useCallback(() => {
    setEnableQuery(true);
    refetch();
  }, [refetch]);

  const showError = isError && !!apiError;

  return (
    <Container>
      <Grid container spacing={2} alignItems={isFetching ? 'center' : 'flex-start'}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={4}>
          <QueryForm isLoading={isFetching} onSubmit={handleOnEnter} />
          <QueryTimer runTimer={enableTimer} time={queryTime} />
        </Grid>
        <Grid item xs={8} justifyContent="center">
          {!validatedBackendURL && (
            <MessageHandler>Put your DALL-E backend URL to start</MessageHandler>
          )}
          {showError && (
            <MessageHandler type="error" variant="h6">
              {apiError}
            </MessageHandler>
          )}
          <Gallery isSuccess={isSuccess} isLoading={isFetching} generatedImages={generatedImages} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(App);
