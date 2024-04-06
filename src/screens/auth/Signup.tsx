import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AuthCard from '../../components/AuthCard';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {SignupSchema, SignupSchemaType} from '../../lib/zodSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '@react-native-community/checkbox';
import {BG_PRIMARY, HEADING} from '../../lib/color';
import {Link} from '../../components/Link';
import InterText from '../../components/InterText';

const Signup = () => {
  const [checkboxState, setCheckboxState] = useState(false);
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
  const onSubmit: SubmitHandler<SignupSchemaType> = data => {
    const response = SignupSchema.safeParse(data);
    console.log(response);
    if (response.success) {
      reset();
    }
  };
  return (
    <AuthCard
      pageHeading="Create your new account"
      pageSubHeading="Create an account to start looking for the food you like"
      authDescription="Have an acount"
      authActionTitle="Login"
      authAction={() => {}}>
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
          render={({field: {}}) => (
            <View style={styles.policyContainer}>
              <CheckBox
                tintColors={{true: BG_PRIMARY}}
                value={checkboxState}
                onValueChange={newVal => setCheckboxState(newVal)}
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
          buttonStyle={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthCard>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    gap: 1,
    marginTop: 32,
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
