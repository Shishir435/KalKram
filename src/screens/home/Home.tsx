import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {AppwriteContext} from '../../appwrite/appwriteContext';
import BottomSheetComponent from '../../components/BottomSheet';
import Button from '../../components/Button';
import ErrorComponent from '../../components/Errro';
import HomeModal from '../../components/HomeModal';
import InterText from '../../components/InterText';
import {RoutesParamList} from '../../types';
import Carousel from '../../components/Carousel';

type HomeScreenProps = NativeStackScreenProps<
  RoutesParamList,
  keyof RoutesParamList
>;
interface RBSheetRef {
  open: () => void;
  close: () => void;
}
const data = [
  {
    heading: '1We serve incomparable delicacies',
    subHeading: `All the best restaurants with their top menu waiting for you, they
    cant't wait for your order!!`,
  },
  {
    heading: '2We serve incomparable delicacies',
    subHeading: `All the best restaurants with their top menu waiting for you, they
    cant't wait for your order!!`,
  },
  {
    heading: '3We serve incomparable delicacies',
    subHeading: `All the best restaurants with their top menu waiting for you, they
    cant't wait for your order!!`,
  },
];
const Home = ({navigation}: HomeScreenProps) => {
  const refRBSheet = useRef<RBSheetRef | null>(null);
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const handleLogout = () => {
    appwrite
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout successfull',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('Login');
      })
      .catch((err: any) => {
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      appwrite
        .getCurrentUser()
        .then(resp => {
          if (resp) {
            const userObj = {
              username: resp.name,
              email: resp.email,
            };
            setUser(userObj);
            // open bottom sheet
            if (showBottomSheet) {
              refRBSheet.current?.open();
              setShowBottomSheet(false);
              setShowModal(true);
            }
          }
        })
        .catch((err: any) => {
          setError(JSON.stringify(err.message));
        });
    } else {
      navigation.navigate('Login');
    }
  }, [appwrite, isLoggedIn, navigation, showBottomSheet]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homebg.png')}
        style={styles.imageBackground}>
        <View>
          {error && <ErrorComponent error={error} />}
          {user && <InterText>{`username: ${user.username}`}</InterText>}
          <Button
            title="Logout"
            buttonStyle={styles.button}
            onPress={handleLogout}
          />
          <Button
            title="showModal"
            buttonStyle={styles.button}
            onPress={() => setShowModal(prev => !prev)}
          />
        </View>
        <View>
          <BottomSheetComponent
            imageSource={require('../../../assets/images/Illustration-Success.png')}
            sheetHeading="Login Successful"
            sheetSubHEading="An event has been created and the invite has been sent to you on mail."
            ref={refRBSheet}
            sheetBtnTitle="LogOut"
            sheetBtnOnPress={handleLogout}
          />
        </View>
        <HomeModal showModal={showModal} setShowModal={setShowModal}>
          <Carousel
            data={data}
            backButtonTItle="Skip"
            onBack={() => setShowModal(false)}
            onEndReach={() => setShowModal(false)}
          />
        </HomeModal>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 100,
    borderRadius: 0,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
});
