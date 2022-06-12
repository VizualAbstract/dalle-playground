import React, { FC, memo } from 'react';

import { Typography } from '@material-ui/core';

const Header: FC = () => {
  return (
    <Typography variant="h4" color="textPrimary" component="h1" align="center">
      DALL-E Playground
    </Typography>
  );
};

export default memo(Header);
