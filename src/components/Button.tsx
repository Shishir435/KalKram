import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import InterText from './InterText';
import {BG_PRIMARY} from '../lib/color';
interface ButtonProp {
  title: string;
  onPress: () => void;
}
const Button = ({title, onPress}: ButtonProp) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <InterText style={styles.text}>{title}</InterText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 100,
    backgroundColor: BG_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
