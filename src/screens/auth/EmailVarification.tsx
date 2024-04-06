import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import AuthContainer from '../../components/AuthContainer';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {OtpSchema, OtpSchemaType} from '../../lib/zodSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import {OtpInput} from 'react-native-otp-entry';
import {BG_PRIMARY} from '../../lib/color';
import InterText from '../../components/InterText';
import {Link} from '../../components/Link';
import Timer from '../../components/Timer';
import Icon from 'react-native-vector-icons/Feather';
import ErrorComponent from '../../components/Errro';
const EmailVarification = () => {
  const otpRef = useRef<any>(null);
  const [reset, setReset] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<OtpSchemaType>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });
  const onSubmit: SubmitHandler<OtpSchemaType> = data => {
    const resp = OtpSchema.safeParse(data);
    console.log(resp);
    if (resp.success) {
      otpRef.current?.clear();
      setReset(prev => !prev);
    }
  };
  return (
    <AuthContainer
      pageHeading="Email verification"
      pageSubHeading="Enter the verification code we send you on:
    Alberts******@gmail.com|"
      showFooter={false}>
      <View style={styles.container}>
        <Controller
          name="otp"
          control={control}
          rules={{required: true}}
          render={({field: {onChange}}) => (
            <OtpInput
              ref={otpRef}
              focusColor={BG_PRIMARY}
              numberOfDigits={4}
              onTextChange={onChange}
              autoFocus
              theme={{
                containerStyle: styles.otpContainer,
                inputsContainerStyle: styles.inputContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
              }}
            />
          )}
        />
        <View style={styles.resend}>
          <InterText>Didn't receive Code?</InterText>
          <Link title="resend" />
        </View>
        <View>
          <ErrorComponent error={errors.otp?.message || ''} />
        </View>
        <View style={styles.timerContainer}>
          <Icon name="clock" size={16} />
          <Timer style={styles.timerText} duration={9 * 60} reset={reset} />
        </View>
        <Button
          role="button"
          title="Continue"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.button}
        />
      </View>
    </AuthContainer>
  );
};

export default EmailVarification;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 32,
  },
  otpContainer: {
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
  },
  inputContainer: {
    // width: 80,
  },
  pinCodeContainer: {
    width: 75,
    height: 72,
  },
  resend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
  },
});
