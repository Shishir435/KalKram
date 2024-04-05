import {StyleSheet, View} from 'react-native';
import React from 'react';
// import Login from './screens/auth/Login';
import AuthCard from './components/AuthCard';
const App = () => {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <AuthCard
        pageHeading="Login to your account"
        pageSubHeading="Please sign in to your account"
        authDescription="Don't have an account?"
        AuthActionTitle="Register"
        AuthAction={() => {}}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
