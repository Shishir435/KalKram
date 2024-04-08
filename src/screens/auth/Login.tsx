import React, {useContext, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {Link} from '../../components/Link';
import {LoginSchema, LoginSchemaType} from '../../lib/zodSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesParamList} from '../../types';
import {AppwriteContext} from '../../appwrite/appwriteContext';
import Snackbar from 'react-native-snackbar';
type LoginScreenProp = NativeStackScreenProps<
  RoutesParamList,
  keyof RoutesParamList
>;
const Login = ({navigation}: LoginScreenProp) => {
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);
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
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [appwrite, isLoggedIn, navigation]);
  const onSubmit: SubmitHandler<LoginSchemaType> = data => {
    const response = LoginSchema.safeParse(data);
    if (response.success) {
      appwrite
        .login(data)
        .then(resp => {
          if (resp) {
            setIsLoggedIn(true);
            reset();
          }
        })
        .catch((err: any) => {
          Snackbar.show({
            text: err.message,
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
  };
  return (
    <AuthContainer
      pageHeading="Login to your account"
      pageSubHeading="Please sign in to your account"
      authDescription="Don't have an account?"
      authActionTitle="Register"
      authAction={() => {
        navigation.navigate('Signup');
      }}>
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
            console.log('hehh');
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
