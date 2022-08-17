import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {intervalToDuration, differenceInSeconds} from 'date-fns';

const useTimer = (startedAt?: string) => {
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerTime, setTimerTime] = useState<number>(0);
  const timer = useRef<any>(null);

  const escapedTimeSeconds = useMemo(() => {
    if (startedAt) {
      return differenceInSeconds(new Date(), new Date(startedAt));
    } else {
      return 0;
    }
  }, [startedAt]);

  const durationInterval = intervalToDuration({
    start: 0,
    end: timerTime * 1000 + escapedTimeSeconds * 1000,
  });

  const stopTimer = useCallback(() => {
    if (timerStarted) {
      setTimerStarted(false);
    }
  }, [timerStarted]);

  useEffect(() => {
    if (timerStarted) {
      timer.current = setInterval(() => {
        setTimerTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timer.current) {
        clearInterval(timer.current);
        setTimerTime(0);
      }
    }
  }, [timerStarted]);

  useEffect(() => {
    if (startedAt) {
      setTimerStarted(true);
    }
  }, [startedAt]);

  return {
    loggedTime: `${durationInterval.hours}:${durationInterval.minutes}:${durationInterval.seconds}`,
    timerStarted,
    stopTimer,
  };
};

export {useTimer};
