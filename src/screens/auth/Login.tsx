import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import AuthCard from '../../components/AuthCard';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Link} from '../../components/Link';
import {LoginSchema, LoginSchemaType} from '../../lib/zodSchema';
import InterText from '../../components/InterText';
import {DANGER_COLOR} from '../../lib/color';
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
    <AuthCard
      pageHeading="Login to your account"
      pageSubHeading="Please sign in to your account"
      authDescription="Don't have an account?"
      authActionTitle="Register"
      authAction={() => {}}>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              label="Email Address"
              placeholder="Enter Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <InterText style={styles.error}>
            {errors.email.message || ''}
          </InterText>
        )}
        <Controller
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
            />
          )}
          name="password"
        />
        {errors.password && (
          <InterText style={styles.error}>
            {errors.password.message || ''}
          </InterText>
        )}
        <Link
          title="Forget Password?"
          onPress={() => {
            console.log('Bhul gye');
          }}
        />
        <Button
          title="Sign In"
          buttonStyle={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthCard>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    gap: 16,
  },
  button: {
    marginVertical: 16,
  },
  error: {
    color: DANGER_COLOR,
  },
});
