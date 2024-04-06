import React from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './screens/auth/Login';
const App = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
