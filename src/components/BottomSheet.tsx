import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import InterText from './InterText';
import Button from './Button';
import {HEADING, SUB_HEADING} from '../lib/color';
import {ImageSourcePropType} from 'react-native';

interface RBSheetRef {
  open: () => void;
  close: () => void;
}
type BottomSheetProps = {
  imageSource: ImageSourcePropType;
  sheetHeading: string;
  sheetSubHEading: string;
  sheetBtnTitle: string;
  sheetBtnOnPress: () => void;
};
const BottomSheetComponent = forwardRef(
  (
    {
      imageSource,
      sheetHeading,
      sheetBtnOnPress,
      sheetBtnTitle,
      sheetSubHEading,
    }: BottomSheetProps,
    ref,
  ) => {
    const bottomSheetRef = useRef<RBSheetRef>(null);
    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.open();
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    return (
      <RBSheet
        ref={bottomSheetRef}
        closeOnPressMask={true}
        closeOnPressBack={true}
        dragOnContent
        height={500}
        customStyles={{
          container: {
            gap: 32,
            alignItems: 'center',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 24,
            paddingBottom: 24,
            paddingTop: 10,
          },
        }}>
        <>
          <Pressable
            style={styles.sheetCloseButtonContainer}
            onPress={() => {
              bottomSheetRef.current?.close();
            }}>
            <View style={styles.sheetCloseButton} />
          </Pressable>
          <Image source={imageSource} style={styles.sheetImage} />
          <View style={styles.sheetTextContainer}>
            <InterText style={styles.sheetHeading}>{sheetHeading}</InterText>
            <InterText style={styles.sheetSubHeading}>
              {sheetSubHEading}
            </InterText>
          </View>
          <Button
            title={sheetBtnTitle}
            onPress={sheetBtnOnPress}
            buttonStyle={styles.actionButton}
          />
        </>
      </RBSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheetCloseButtonContainer: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetCloseButton: {
    width: 60,
    height: 4,
    backgroundColor: '#00000033',
    borderRadius: 100,
  },
  sheetImage: {
    width: 202,
    height: 168,
  },
  sheetTextContainer: {
    gap: 12,
  },
  sheetHeading: {
    color: HEADING,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sheetSubHeading: {
    color: SUB_HEADING,
    fontSize: 14,
    textAlign: 'center',
  },
  actionButton: {
    width: '95%',
  },
});

export default BottomSheetComponent;
