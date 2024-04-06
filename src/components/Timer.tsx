import React, {useEffect, useMemo, useState} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import InterText from './InterText';
interface TimerProps {
  duration: number;
  reset: boolean;
  style?: StyleProp<TextStyle>;
}
function minutAndSecon(time: number) {
  let minute = Math.floor(time / 60);
  let second = time % 60;
  return {minute, second};
}
const Timer = ({duration, reset, style}: TimerProps) => {
  const [time, setTime] = useState(duration);
  const {minute, second} = useMemo(() => minutAndSecon(time), [time]);
  useEffect(() => {
    setTime(duration);
  }, [duration, reset]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [reset]);

  return (
    <InterText style={[style]}>
      {String(minute).padStart(2, '0') + ':' + String(second).padStart(2, '0')}
    </InterText>
  );
};

export default Timer;
