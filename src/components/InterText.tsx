import {Text, TextStyle} from 'react-native';
import React from 'react';

interface InterTextProps {
  children: string;
  style?: TextStyle;
}
const InterText = ({children, style}: InterTextProps) => {
  const combinedStyle: TextStyle = {
    fontFamily: 'Inter',
    ...style,
  };
  return <Text style={combinedStyle}>{children}</Text>;
};

export default InterText;
