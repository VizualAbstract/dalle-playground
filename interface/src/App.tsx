import React, { memo, useCallback, useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { Container, Grid } from '@material-ui/core';

import { callDalleService } from 'api/backend_api';
import Gallery from 'components/Gallery';
import Header from 'components/Layout/Header';
import MessageHandler from 'components/Layout/MessageHandler';
import QueryForm from 'components/QueryForm';
import QueryTimer from 'components/QueryTimer';
import { QueryContext } from 'contexts/QueryContext';

const getDalle = async ({ url, query, limit }) => {
  const { generatedImgs } = await callDalleService(url, query, limit);
  return generatedImgs;
};

const App = () => {
  const { serverURL, queryString, validatedBackendURL, imagesPerQuery } = useContext(QueryContext);

  // Query Timer
  const [enableTimer, setEnableTimer] = useState(false);
  const [queryTime, setQueryTime] = useState(0);

  // Query results
  const [enableQuery, setEnableQuery] = useState(false);
  const [apiError, setApiError] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);

  const getImages = useCallback(() => {
    setEnableTimer(true);
    setApiError('');
    return getDalle({
      url: serverURL,
      query: queryString,
      limit: imagesPerQuery,
    });
  }, [serverURL, queryString, imagesPerQuery]);

  const onSettled = useCallback(() => {
    setEnableTimer(false);
    setEnableQuery(false);
  }, []);

  const onSuccess = useCallback((response) => {
    if (response.ok) {
      // Set final execution time
      setQueryTime(response['executionTime']);
      // Display results
      setGeneratedImages(response['generatedImgs']);
    }
  }, []);

  const onError = useCallback((error: any) => {
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

  const { isLoading, isSuccess, refetch, isError } = useQuery(
    ['DALLE', serverURL, queryString, imagesPerQuery],
    () => getImages,
    {
      enabled: enableQuery,
      retry: false,
      onSettled: onSettled,
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const handleOnEnter = useCallback(() => {
    setEnableQuery(true);
    refetch();
  }, [refetch]);

  const showError = isError && !!apiError;

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={4}>
          <QueryForm isLoading={isLoading} onSubmit={handleOnEnter} />
          <QueryTimer runTimer={enableTimer} time={queryTime} />
        </Grid>
        <Grid item xs={8}>
          {!validatedBackendURL && (
            <MessageHandler>Put your DALL-E backend URL to start</MessageHandler>
          )}
          {showError && (
            <MessageHandler type="error" variant="h6">
              {apiError}
            </MessageHandler>
          )}
          <Gallery isSuccess={isSuccess} isLoading={isLoading} generatedImages={generatedImages} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(App);
