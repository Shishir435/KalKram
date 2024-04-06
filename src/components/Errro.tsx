import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import InterText from './InterText';
import React from 'react';
import {DANGER_COLOR} from '../lib/color';
interface ErrorComponentProps {
  error: string;
  style?: StyleProp<TextStyle>;
}
const ErrorComponent = ({error, style}: ErrorComponentProps) => {
  return <InterText style={[styles.error, style]}>{error}</InterText>;
};
const styles = StyleSheet.create({
  error: {
    color: DANGER_COLOR,
  },
});
export default ErrorComponent;
