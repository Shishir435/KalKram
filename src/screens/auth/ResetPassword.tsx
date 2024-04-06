import {StyleSheet, View} from 'react-native';
import React from 'react';
import AuthContainer from '../../components/AuthContainer';
import {
  ResetPasswordSchemaType,
  ResetPasswordSchema,
} from '../../lib/zodSchema';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import Input from '../../components/Input';

const ResetPassword = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });
  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = data => {
    const resp = ResetPasswordSchema.safeParse(data);
    console.log(resp, errors);
    if (resp.success) {
      reset();
    }
  };
  return (
    <AuthContainer
      pageHeading="Reset Password"
      pageSubHeading="Your new password must be different from the previously used password"
      showFooter={false}>
      <View style={styles.container}>
        <Controller
          name="newPassword"
          control={control}
          rules={{required: true}}
          render={({field: {value, onBlur, onChange}}) => (
            <Input
              label="New Password"
              placeholder="new password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.newPassword?.message}
              inputType="PASSWORD"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{required: true}}
          render={({field: {value, onBlur, onChange}}) => (
            <Input
              label="Confirm Password"
              placeholder="confirm password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
              inputType="PASSWORD"
            />
          )}
        />
        <Button title="Verify Account" onPress={handleSubmit(onSubmit)} />
      </View>
    </AuthContainer>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginTop: 32,
  },
});
