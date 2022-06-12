import React, { FC } from 'react';

import { PropTypes, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

import { COLOR_MAP } from 'utils';

interface Props {
  message?: string;
  type?: 'default' | 'info' | 'error';
  variant?: Variant;
  align?: PropTypes.Alignment;
}

const MessageHandler: FC<Props> = ({
  message,
  type = 'initial',
  variant = 'body1',
  align = 'center',
}) => {
  if (!message) {
    return null;
  }

  const color = COLOR_MAP[type];

  return (
    <Typography color={color} variant={variant} align={align}>
      {message}
    </Typography>
  );
};

export default MessageHandler;
