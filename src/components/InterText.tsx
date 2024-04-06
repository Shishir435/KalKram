import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface InterTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}
const InterText = ({children, style}: InterTextProps) => {
  return <Text style={[styles.container, style]}>{children}</Text>;
};

export default InterText;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Inter',
  },
});
