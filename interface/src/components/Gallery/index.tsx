import React, { FC, memo, useContext } from 'react';

import ImageList from 'components/Gallery/ImageList';
import LoadingSpinner from 'components/Layout/LoadingSpinner';
import MessageHandler from 'components/Layout/MessageHandler';
import { QueryContext } from 'contexts/QueryContext';

interface Props {
  isSuccess: boolean;
  isLoading: boolean;
  generatedImages: any[];
}

const Gallery: FC<Props> = ({ isSuccess = false, isLoading = false, generatedImages }) => {
  const { queryString } = useContext(QueryContext);

  const showMessage = !isLoading && isSuccess;
  const showResults = !isLoading && generatedImages.length > 0;

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {showMessage && <MessageHandler>Results for: &ldquo;{queryString}&rdquo;</MessageHandler>}
      {showResults && <ImageList generatedImages={generatedImages} />}
    </>
  );
};

Gallery.displayName = 'Gallery';

export default memo(Gallery);
