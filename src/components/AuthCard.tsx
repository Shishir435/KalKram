import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import InterText from './InterText';
import Button from './Button';
import {BG_PRIMARY, HEADING, SUB_HEADING} from '../lib/color';
import {Icon} from './Icons';
interface AuthCardProps {
  children?: React.ReactNode;
  pageHeading: string;
  pageSubHeading: string;
  authDescription: string;
  AuthActionTitle: string;
  AuthAction: () => void;
}
const AuthCard = ({
  children,
  pageHeading,
  pageSubHeading,
  AuthAction,
  AuthActionTitle,
  authDescription,
}: AuthCardProps) => {
  return (
    <View style={styles.container}>
      <View>
        <InterText style={styles.heading}>{pageHeading}</InterText>
        <InterText style={styles.subHeading}>{pageSubHeading}</InterText>
      </View>
      <View>{children}</View>
      <View>
        <Button title="button" onPress={() => Alert.alert('hello ji')} />
      </View>
      <View style={styles.divider}>
        <View style={styles.line} />
        <InterText>Or signin with </InterText>
        <View style={styles.line} />
      </View>
      <View style={styles.socials}>
        <View style={styles.circle}>
          <Icon.google height={24} width={24} />
        </View>
      </View>
      <View style={styles.footer}>
        <InterText style={styles.authDescription}>{authDescription}</InterText>
        <TouchableOpacity onPress={AuthAction}>
          <InterText style={styles.authTitle}>{AuthActionTitle}</InterText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 32,
    gap: 4,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: HEADING,
    lineHeight: 40,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '400',
    color: SUB_HEADING,
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: SUB_HEADING,
    marginHorizontal: 8,
  },
  socials: {
    alignItems: 'center',
    marginVertical: 12,
  },
  circle: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SUB_HEADING,
    borderRadius: 1000,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 12,
  },
  authDescription: {
    fontSize: 14,
    color: HEADING,
  },
  authTitle: {
    color: BG_PRIMARY,
    fontSize: 14,
  },
});
