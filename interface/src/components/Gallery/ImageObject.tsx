import React, { FC } from 'react';

interface Props {
  imageData: string;
  alt?: string;
}

const ImageObject: FC<Props> = ({ imageData, alt = '' }) => {
  if (!imageData) {
    return null;
  }
  return <img src={`data:image/png;base64,${imageData}`} alt={alt} />;
};

export default ImageObject;
