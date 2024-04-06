import React from 'react';
import {StyleSheet, View} from 'react-native';
// import ForgetPassword from './screens/auth/ForgetPassword';
// import EmailVarification from './screens/auth/EmailVarification';
import ResetPassword from './screens/auth/ResetPassword';
// import Login from './screens/auth/Login';
// import Signup from './screens/auth/Signup';
const App = () => {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <ForgetPassword /> */}
      {/* <EmailVarification /> */}
      <ResetPassword />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
