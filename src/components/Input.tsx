import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import InterText from './InterText';
import {HEADING, SUB_HEADING} from '../lib/color';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps {
  label: string;
  placeholder?: string;
  onBlur: () => void;
  onChangeText: (text: string) => void;
  value: string;
  inputType?: 'TEXT' | 'PASSWORD';
}
export const Input = ({
  label,
  placeholder,
  onBlur,
  onChangeText,
  value,
  inputType = 'TEXT',
}: InputProps) => {
  console.log(inputType === 'PASSWORD');
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <View style={styles.container}>
      <InterText style={styles.label}>{label}</InterText>
      <View style={styles.eyeParent}>
        <TextInput
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
          secureTextEntry={inputType === 'PASSWORD' && !show}
        />
        {inputType === 'PASSWORD' && (
          <Pressable onPress={() => setShow(prev => !prev)} style={styles.eye}>
            {show ? (
              <Icon name="eye" size={20} />
            ) : (
              <Icon name="eye-off" size={20} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginVertical: 8,
  },
  label: {
    color: HEADING,
    fontWeight: '900',
  },
  input: {
    borderWidth: 1,
    borderColor: SUB_HEADING,
    height: 52,
    borderRadius: 8,
    padding: 4,
    paddingLeft: 16,
  },
  eyeParent: {
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
  },
});
