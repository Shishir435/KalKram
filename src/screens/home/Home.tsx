import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppwriteContext} from '../../appwrite/appwriteContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesParamList} from '../../types';
import Button from '../../components/Button';
import Snackbar from 'react-native-snackbar';
import ErrorComponent from '../../components/Errro';
import InterText from '../../components/InterText';
type HomeScreenProps = NativeStackScreenProps<
  RoutesParamList,
  keyof RoutesParamList
>;
const Home = ({navigation}: HomeScreenProps) => {
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
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
          }
        })
        .catch((err: any) => {
          setError(JSON.stringify(err.message));
        });
    } else {
      navigation.navigate('Login');
    }
  }, [appwrite, isLoggedIn, navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homebg.png')}
        style={styles.imageBackground}>
        <Text>Home</Text>
        {error && <ErrorComponent error={error} />}
        {user && <InterText>{user.username}</InterText>}
        <Button
          title="Logout"
          onPress={() => {
            appwrite
              .logout()
              .then(() => {
                setIsLoggedIn(false);
                Snackbar.show({
                  text: 'Logout successfull',
                  duration: Snackbar.LENGTH_SHORT,
                });
                // navigation.navigate('Login');
              })
              .catch((err: any) => {
                Snackbar.show({
                  text: err.message,
                  duration: Snackbar.LENGTH_LONG,
                });
              });
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
});
