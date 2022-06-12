import React, { FC, memo, useContext } from 'react';

import { Button, Card, CardActions, CardContent } from '@material-ui/core';

import QueryLimitSelect from 'components/QueryForm/Fields/QueryLimitSelect';
import SearchQueryInput from 'components/QueryForm/Fields/SearchQueryInput';
import ServerURLInput from 'components/QueryForm/Fields/ServerURLInput';
import { QueryContext } from 'contexts/QueryContext';

interface Props {
  isLoading: boolean;
  onSubmit: () => void;
}

const QueryForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const { queryString, isValidURL } = useContext(QueryContext);

  const disableBackendURL = isLoading;
  const disableQueryString = disableBackendURL || !isValidURL;
  const disablePerQuerySelect = disableQueryString || !queryString;
  const disableSubmit = [disableBackendURL, disableQueryString, disablePerQuerySelect].includes(
    true,
  );

  return (
    <Card>
      <CardContent>
        <ServerURLInput isDisabled={disableBackendURL} />
        <SearchQueryInput onEnter={onSubmit} isDisabled={disableQueryString} />
        <QueryLimitSelect isDisabled={disablePerQuerySelect} />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={disableSubmit}
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

QueryForm.displayName = 'QueryForm';

export default memo(QueryForm);
