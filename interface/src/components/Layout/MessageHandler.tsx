import React, { FC } from 'react';

import { PropTypes, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

import { COLOR_MAP } from 'utils';

interface Props {
  children?: React.ReactNode;
  type?: 'default' | 'info' | 'error' | 'muted';
  variant?: Variant;
  align?: PropTypes.Alignment;
}

const MessageHandler: FC<Props> = ({
  children,
  type = 'initial',
  variant = 'body1',
  align = 'center',
}) => {
  if (!children) {
    return null;
  }

  const color = COLOR_MAP[type];

  return (
    <Typography color={color} variant={variant} align={align}>
      {children}
    </Typography>
  );
};

export default MessageHandler;
