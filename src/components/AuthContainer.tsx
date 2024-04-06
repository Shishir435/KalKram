import {StyleSheet, View} from 'react-native';
import React from 'react';
import InterText from './InterText';
import {BG_PRIMARY, HEADING, SUB_HEADING} from '../lib/color';
import {Icon} from './Icons';
import {Link} from './Link';
interface AuthCardProps {
  children?: React.ReactNode;
  pageHeading: string;
  pageSubHeading: string;
  authDescription?: string;
  authActionTitle?: string;
  authAction?: () => void;
  showFooter?: boolean;
}
const AuthContainer = ({
  children,
  pageHeading,
  pageSubHeading,
  authAction,
  authActionTitle,
  authDescription,
  showFooter = true,
}: AuthCardProps) => {
  return (
    <View style={styles.container}>
      <View>
        <InterText style={styles.heading}>{pageHeading}</InterText>
        <InterText style={styles.subHeading}>{pageSubHeading}</InterText>
      </View>
      <View>{children}</View>
      {showFooter && (
        <>
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
            <InterText style={styles.authDescription}>
              {authDescription || ''}
            </InterText>
            <Link title={authActionTitle || ''} onPress={authAction} />
          </View>
        </>
      )}
    </View>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 64,
    gap: 4,
  },
  heading: {
    fontSize: 40, //figma 32
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
    fontWeight: 'bold',
  },
  authTitle: {
    color: BG_PRIMARY,
    fontSize: 14,
    textAlign: 'center',
  },
});
