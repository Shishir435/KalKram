import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BG_PRIMARY} from '../lib/color';
interface HomeModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  style?: StyleProp<ViewProps>;
  showCloseButton?: boolean;
  closeButtonColor?: string;
}

const HomeModal = ({
  showModal,
  children,
  style,
  setShowModal,
  showCloseButton = false,
  closeButtonColor = '#000',
}: HomeModalProps) => {
  return showModal ? (
    <View style={[styles.modalContainer, style]}>
      {showCloseButton && (
        <View style={[styles.closeButton, {borderColor: closeButtonColor}]}>
          <Pressable onPress={() => setShowModal(false)}>
            <Icon name="close" size={20} color={closeButtonColor} />
          </Pressable>
        </View>
      )}
      {children}
    </View>
  ) : (
    <View />
  );
};

export default HomeModal;

const styles = StyleSheet.create({
  modalContainer: {
    height: 410,
    width: '80%',
    margin: 20,
    padding: 40,
    backgroundColor: BG_PRIMARY,
    borderRadius: 48,
    justifyContent: 'space-between',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: '60%',
    borderColor: '#000',
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
