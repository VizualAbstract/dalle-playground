import React, { memo, FC, useCallback, useContext, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

import { Grid, TextField } from '@material-ui/core';

import { validateDalleServer } from 'api/backend_api';
import { QueryContext } from 'contexts/QueryContext';
import { validateURL } from 'utils';

type Props = {
  isDisabled: boolean;
};

const ServerURLInput: FC<Props> = ({ isDisabled }) => {
  const { serverURL, setServerURL, isValidURL, setIsValidURL } = useContext(QueryContext);

  const [inputValue, setInputValue] = useState(serverURL);
  const [isCheckingURL, setIsCheckingURL] = useState(false);

  const hasError = !isValidURL && !!inputValue;
  const helperText = hasError ? 'No running DALL-E server with this URL' : '';

  const handleOnChange = useCallback(
    async (newURL: string) => {
      setIsCheckingURL(true);
      setInputValue(newURL);

      try {
        if (!validateURL(newURL)) {
          throw Error('Not a valid URL');
        }

        const response = await validateDalleServer(newURL);

        if (!response.ok) {
          throw Error('HTTP error');
        }

        setIsValidURL(true);
        setServerURL(newURL);
      } catch (err) {
        window.console.error(err);
        setIsValidURL(false);
      } finally {
        setIsCheckingURL(false);
      }
    },
    [setIsCheckingURL, setServerURL, setIsValidURL, setInputValue],
  );

  useEffect(() => {
    handleOnChange(serverURL);
  }, [handleOnChange, serverURL]);

  return (
    <TextField
      id="standard-basic"
      label="Server URL"
      value={inputValue}
      disabled={isDisabled}
      error={hasError}
      helperText={helperText}
      onChange={(event) => handleOnChange(event.target.value)}
      InputProps={{
        endAdornment: isCheckingURL && (
          <Grid item xs={2}>
            <PulseLoader size={5} />
          </Grid>
        ),
      }}
      fullWidth
    />
  );
};

export default memo(ServerURLInput);
