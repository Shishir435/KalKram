import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Link} from '../../components/Link';
import {LoginSchema, LoginSchemaType} from '../../lib/zodSchema';
import {zodResolver} from '@hookform/resolvers/zod';
const Login = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<LoginSchemaType> = data => {
    console.log(data);
    const response = LoginSchema.safeParse(data);
    console.log('resp', response);
    reset();
  };
  return (
    <AuthContainer
      pageHeading="Login to your account"
      pageSubHeading="Please sign in to your account"
      authDescription="Don't have an account?"
      authActionTitle="Register"
      authAction={() => {}}>
      <View style={styles.container}>
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              label="Email Address"
              placeholder="Enter Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{required: true}}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              label="Password"
              placeholder="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputType="PASSWORD"
              error={errors.password?.message}
            />
          )}
        />
        <Link
          title="Forget Password?"
          onPress={() => {
            console.log('Bhul gye');
          }}
        />
        <Button
          title="Sign In"
          role="button"
          buttonStyle={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    gap: 2,
  },
  button: {
    marginVertical: 16,
  },
});
