import {StyleSheet, View} from 'react-native';
import React from 'react';
import InterText from './components/InterText';

const App = () => {
  return (
    <View style={styles.container}>
      <InterText>App hi</InterText>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
