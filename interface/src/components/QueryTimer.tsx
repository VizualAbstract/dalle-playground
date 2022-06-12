import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Typography } from '@material-ui/core';

const useTimer = (initialTime = 0) => {
  const [queryTime, setQueryTime] = useState(initialTime);

  const currentTime = useMemo(() => queryTime, [queryTime]);

  const timer = useRef(null);

  const startTimer = useCallback(() => {
    let time = 0;
    timer.current = setInterval(() => {
      time = time + 100 / 1000;
      setQueryTime(parseInt(time.toFixed(2)));
    }, 100);
  }, [timer, setQueryTime]);

  const stopTimer = useCallback(
    (finalTime = 0) => {
      clearInterval(timer.current);
      setQueryTime(finalTime);
    },
    [timer, setQueryTime],
  );

  const setTimer = useCallback(
    (time) => {
      stopTimer();
      setQueryTime(time);
    },
    [stopTimer, setQueryTime],
  );

  return {
    startTimer,
    stopTimer,
    currentTime,
    setTimer,
  };
};

interface Props {
  runTimer: boolean;
  time?: number;
}

const QueryTimer: FC<Props> = ({ runTimer = false, time }) => {
  const { startTimer, stopTimer, currentTime, setTimer } = useTimer();

  useEffect(() => {
    if (runTimer) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [runTimer]);

  useEffect(() => setTimer(time), [time]);

  return (
    <>
      {currentTime !== 0 && (
        <Typography variant="body2" color="textSecondary" align="center">
          Query execution time: {currentTime} sec
        </Typography>
      )}
    </>
  );
};

QueryTimer.displayName = 'QueryTimer';

export default memo(QueryTimer);
