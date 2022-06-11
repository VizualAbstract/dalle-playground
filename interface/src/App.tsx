import React, { memo, useCallback, useContext, useState } from 'react';
import { useQuery } from 'react-query';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import { callDalleService } from 'api/backend_api';
import BackendUrlInput from 'components/BackendUrlInput';
import ImagesPerQuerySelect from 'components/Form/ImagesPerQuerySelect';
import GeneratedImageList from 'components/GeneratedImageList';
import Header from 'components/Layout/Header';
import LoadingSpinner from 'components/LoadingSpinner';
import QueryTimer from 'components/QueryTimer';
import TextPromptInput from 'components/TextPromptInput';
import { FormContext } from 'contexts/FormContext';

const getDalle = async ({ url, query, limit }) => {
  const { generatedImgs } = await callDalleService(url, query, limit);
  return generatedImgs;
};

const App = () => {
  const { backendURL, queryString, validatedBackendURL, isValidURL, imagesPerQuery } =
    useContext(FormContext);

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
      url: backendURL,
      query: queryString,
      limit: imagesPerQuery,
    });
  }, [backendURL, queryString, imagesPerQuery]);

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

  const onError = useCallback(
    (error: any) => {
      setQueryTime(0);

      window.console.log('Error querying DALL-E service.', error);

      if (error.message === 'Timeout') {
        setApiError(
          'Timeout querying DALL-E service (>1min). Consider reducing the images per query or use a stronger backend.',
        );
      } else {
        setApiError('Error querying DALL-E service. Check your backend server logs.');
      }
    },
    [setQueryTime, setApiError],
  );

  const { isLoading, isSuccess, refetch, isError } = useQuery(
    ['DALLE', backendURL, queryString, imagesPerQuery],
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

  const disableBackendURL = isLoading;
  const disableQueryString = disableBackendURL || !isValidURL;
  const disablePerQuerySelect = disableQueryString || !queryString;
  const disableSubmit = [disableBackendURL, disableQueryString, disablePerQuerySelect].includes(
    true,
  );

  const showError = isError && !!apiError;
  const showResults = isSuccess && generatedImages.length > 0;
  const showGallery = !isLoading && (showError || showResults);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        {!validatedBackendURL && (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              Put your DALL-E backend URL to start
            </Typography>
          </Grid>
        )}
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <BackendUrlInput isDisabled={disableBackendURL} />
              <TextPromptInput onEnter={handleOnEnter} isDisabled={disableQueryString} />
              <ImagesPerQuerySelect isDisabled={disablePerQuerySelect} />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={handleOnEnter}
                disabled={disableSubmit}
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </CardActions>
          </Card>
          <QueryTimer runTimer={enableTimer} time={queryTime} />
        </Grid>
        {showGallery && (
          <Grid item xs={8}>
            {showResults && (
              <Typography variant="body1" color="textPrimary">
                Results for: &lquot;{queryString}&ldquot;
              </Typography>
            )}
            {showError && (
              <Typography variant="h5" color="error">
                {apiError}
              </Typography>
            )}
            {isLoading && <LoadingSpinner />}
            {showResults && <GeneratedImageList generatedImages={generatedImages} />}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

App.displayName = 'App';

export default memo(App);
