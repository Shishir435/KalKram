import React from 'react';
import {StyleSheet, View} from 'react-native';
import ForgetPassword from './screens/auth/ForgetPassword';
// import Login from './screens/auth/Login';
// import Signup from './screens/auth/Signup';
const App = () => {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      {/* <Signup /> */}
      <ForgetPassword />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
