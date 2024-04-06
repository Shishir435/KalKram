import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import InterText from './InterText';
import React from 'react';
import {BG_PRIMARY} from '../lib/color';
interface LinkProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
}
export const Link = ({title, titleStyle, ...props}: LinkProps) => {
  return (
    <TouchableOpacity {...props}>
      <InterText style={[styles.title, titleStyle]}>{title}</InterText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: BG_PRIMARY,
    textAlign: 'right',
  },
});
