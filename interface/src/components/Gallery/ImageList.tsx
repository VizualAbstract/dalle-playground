import React, { FC, memo } from 'react';

import { Grid } from '@material-ui/core';

import ImageObject from 'components/Gallery/ImageObject';

interface Props {
  generatedImages: any[];
}

const ImageList: FC<Props> = ({ generatedImages }) => {
  if (!generatedImages.length) {
    return null;
  }

  return (
    <Grid container alignItems="center" spacing={3}>
      {generatedImages.map((generatedImg, index) => {
        return (
          <Grid item key={index}>
            <ImageObject imageData={generatedImg} alt={`image-${index}`} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default memo(ImageList);
