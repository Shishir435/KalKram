import {zodResolver} from '@hookform/resolvers/zod';
import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InterText from '../../components/InterText';
import {Link} from '../../components/Link';
import {BG_PRIMARY, HEADING} from '../../lib/color';
import {SignupSchema, SignupSchemaType} from '../../lib/zodSchema';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesParamList} from '../../types';
import {AppwriteContext} from '../../appwrite/appwriteContext';
import Snackbar from 'react-native-snackbar';

type SignupScreenProps = NativeStackScreenProps<
  RoutesParamList,
  keyof RoutesParamList
>;
const Signup = ({navigation}: SignupScreenProps) => {
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);
  const {
    handleSubmit,
    reset,
    formState: {errors},
    control,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      policy: false,
    },
  });
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn, navigation]);
  const onSubmit: SubmitHandler<SignupSchemaType> = data => {
    const response = SignupSchema.safeParse(data);
    console.log(response);
    if (response.success) {
      reset();
      appwrite
        .createAccount(data)
        .then(resp => {
          if (resp) {
            setIsLoggedIn(true);
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
      pageHeading="Create your new account"
      pageSubHeading="Create an account to start looking for the food you like"
      authDescription="Have an acount"
      authActionTitle="Login"
      authAction={() => {
        navigation.navigate('Login');
      }}>
      <View style={styles.container}>
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              label="Email"
              placeholder="Enter Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          rules={{required: true}}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              label="Username"
              placeholder="usernmae"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
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
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
              inputType="PASSWORD"
            />
          )}
        />
        <Controller
          name="policy"
          control={control}
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <View style={styles.policyContainer}>
              <CheckBox
                tintColors={{true: BG_PRIMARY}}
                value={value}
                onValueChange={onChange}
              />
              <InterText style={styles.policyText}>I agree With</InterText>
              <Link
                title="Terms & Services"
                onPress={() => {}}
                titleStyle={styles.policyLinkText}
              />
              <InterText style={styles.policyText}>and</InterText>
              <Link
                title="Privacy Policy"
                onPress={() => {}}
                titleStyle={styles.policyLinkText}
              />
            </View>
          )}
        />
        <Button
          title="Register"
          role="button"
          buttonStyle={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthContainer>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    gap: 1,
    // marginTop: 16,
  },
  button: {
    marginVertical: 16,
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexWrap: 'wrap',
  },
  policyText: {
    color: HEADING,
    fontWeight: 'bold',
    fontSize: 14,
  },
  policyLinkText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
