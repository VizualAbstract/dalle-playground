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

  const showResults = !isLoading && isSuccess && generatedImages.length > 0;

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {showResults && <MessageHandler message={`Results for: &lquot;${queryString}&ldquot;`} />}
      {showResults && <ImageList generatedImages={generatedImages} />}
    </>
  );
};

Gallery.displayName = 'Gallery';

export default memo(Gallery);
