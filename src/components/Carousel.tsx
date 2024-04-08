import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {BG_PRIMARY} from '../lib/color';
import CircleWithArrow from './CircleWithArrow';
import InterText from './InterText';
interface CarouselProps {
  data: {
    heading: string;
    subHeading: string;
  }[];
  nextBtnTitle?: string;
  backButtonTItle?: string;
  onNext?: () => void;
  onBack?: () => void;
  onEndReach?: () => void;
}
const Carousel = ({
  data,
  onBack,
  onNext,
  nextBtnTitle,
  backButtonTItle,
  onEndReach,
}: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const handleBack = () => {
    setIndex(prev => {
      if (prev === 0) {
        return data.length - 1;
      } else {
        return prev - 1;
      }
    });
  };
  const handleNext = () => {
    setIndex(prev => {
      if (prev === data.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    // onNext button function
    if (onNext) {
      onNext();
    }
  };
  return (
    <View style={styles.carouselContainer}>
      <View style={styles.textContainer}>
        <InterText style={styles.heading}>{data[index].heading}</InterText>
        <InterText style={styles.subHeading}>
          {data[index].subHeading}
        </InterText>
        <View style={styles.paginationContainer}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationBar,
                index === i && styles.activePaginationBar,
              ]}
            />
          ))}
        </View>
      </View>
      {/* Show component when user readhes the last slid of carousel */}
      {onEndReach && index === data.length - 1 ? (
        <View style={styles.onEndReachContainer}>
          <CircleWithArrow showAnimation={false} onPress={onEndReach} />
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.btnPressableContainer}
            onPress={() => {
              handleBack();
              // onBak button function
              if (onBack) {
                onBack();
              }
            }}>
            {!backButtonTItle && (
              <Icon
                size={20}
                selectionColor={BG_PRIMARY}
                name="arrow-left"
                style={styles.rightArrow}
              />
            )}
            <InterText style={styles.button}>
              {backButtonTItle || 'back'}
            </InterText>
          </Pressable>
          <Pressable
            style={styles.btnPressableContainer}
            onPress={() => {
              handleNext();
            }}>
            <InterText style={styles.button}>
              {nextBtnTitle || 'Next'}
            </InterText>
            <Icon
              size={20}
              selectionColor={BG_PRIMARY}
              name="arrow-right"
              style={styles.rightArrow}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {},
  onEndReachContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationBar: {
    width: 30,
    height: 6,
    backgroundColor: '#C2C2C2',
    borderRadius: 100,
  },
  activePaginationBar: {
    backgroundColor: '#ffffff',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  btnPressableContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
    padding: 10,
    height: 80,
    width: 100,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  rightArrow: {
    color: '#fff',
    fontSize: 14,
    alignItems: 'center',
  },
});
