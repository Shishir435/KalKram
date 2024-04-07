import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {BG_PRIMARY} from '../lib/color';
import InterText from './InterText';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={BG_PRIMARY} size="large" />
      <InterText>Loading...</InterText>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
