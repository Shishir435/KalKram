import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {AppwriteContext} from '../../appwrite/appwriteContext';
import Button from '../../components/Button';
import ErrorComponent from '../../components/Errro';
import InterText from '../../components/InterText';
import {RoutesParamList} from '../../types';
import BottomSheetComponent from '../../components/BottomSheet';

type HomeScreenProps = NativeStackScreenProps<
  RoutesParamList,
  keyof RoutesParamList
>;
interface RBSheetRef {
  open: () => void;
  close: () => void;
}
const Home = ({navigation}: HomeScreenProps) => {
  const refRBSheet = useRef<RBSheetRef | null>(null);
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);
  const [showBottomSheet, setShowBottomSheet] = useState(true);
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
        {error && <ErrorComponent error={error} />}
        {user && <InterText>{user.username}</InterText>}
        <Button
          title="Logout"
          buttonStyle={styles.button}
          onPress={handleLogout}
        />
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
    resizeMode: 'cover',
  },
});
