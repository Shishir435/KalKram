import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthContainer from '../../components/AuthContainer';

const ForgetPassword = () => {
  return (
    <AuthContainer
      pageHeading="Forgot password?"
      pageSubHeading="Enter your email address and we’ll send you confirmation code to reset your password"
      showFooter={false}>
      <View style={styles.container}>
        <Text>ForgetPassword</Text>
      </View>
    </AuthContainer>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {},
});
