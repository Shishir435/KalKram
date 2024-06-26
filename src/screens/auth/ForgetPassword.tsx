import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import AuthContainer from '../../components/AuthContainer';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  ForgetPassowrdSchema,
  ForgetPassowrdSchemaType,
} from '../../lib/zodSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesParamList} from '../../types';
import {AppwriteContext} from '../../appwrite/appwriteContext';
import Snackbar from 'react-native-snackbar';
type ForgetPasswordScreenProps = NativeStackScreenProps<
  RoutesParamList,
  keyof RoutesParamList
>;
const ForgetPassword = ({navigation}: ForgetPasswordScreenProps) => {
  const {appwrite} = useContext(AppwriteContext);
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<ForgetPassowrdSchemaType>({
    resolver: zodResolver(ForgetPassowrdSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit: SubmitHandler<ForgetPassowrdSchemaType> = data => {
    const response = ForgetPassowrdSchema.safeParse(data);
    console.log(response);
    if (response.success) {
      reset();
      appwrite.sendOTP({email: response.data.email}).then(resp => {
        if (resp) {
          Snackbar.show({
            text: `Otp is sent to your ${response.data.email}`,
            duration: Snackbar.LENGTH_LONG,
          });
          navigation.navigate('EmailVarification', {
            email: response.data.email,
          });
        }
      });
    }
  };
  return (
    <AuthContainer
      pageHeading="Forgot password?"
      pageSubHeading="Enter your email address and we’ll send you confirmation code to reset your password"
      showFooter={false}>
      <View style={styles.container}>
        <Controller
          name="email"
          rules={{required: true}}
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              label="Email"
              placeholder="Enter Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />
        <Button
          role="button"
          title="Continue"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthContainer>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    gap: 64,
    marginTop: 32,
  },
});
