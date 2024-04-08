import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, Pressable, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {BG_PRIMARY} from '../lib/color';

interface CircleWithArrowProps {
  onPress: () => void;
  showAnimation: boolean;
}

const CircleWithArrow = ({onPress, showAnimation}: CircleWithArrowProps) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const startRotation = useCallback(() => {
    rotateAnim.setValue(0);
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500, // Duration of one rotation
        useNativeDriver: true, // Use native driver for better performance
      }),
    ).start();
  }, [rotateAnim]);

  const stopRotation = useCallback(() => {
    rotateAnim.stopAnimation();
  }, [rotateAnim]);

  useEffect(() => {
    if (showAnimation) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [showAnimation, startRotation, stopRotation]);

  // Interpolate the rotating animated value to map it to degrees
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.outerCircle, {transform: [{rotate: rotation}]}]}>
        <Pressable style={styles.innerCircle} onPress={onPress}>
          <Icon name="arrow-right" style={styles.rightArrow} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 96,
  },
  outerCircle: {
    height: 96,
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderTopColor: 'rgba(252,252,252,0.1)',
    borderRadius: 48,
  },
  innerCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  rightArrow: {
    color: BG_PRIMARY,
    fontSize: 20,
    alignItems: 'center',
  },
});

export default CircleWithArrow;
