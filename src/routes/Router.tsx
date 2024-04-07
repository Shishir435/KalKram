import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppwriteContext} from '../appwrite/appwriteContext';
import Loading from '../components/Loading';
import ErrorComponent from '../components/Errro';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import {RoutesParamList} from '../types';

const Stack = createNativeStackNavigator<RoutesParamList>();

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);
  useEffect(() => {
    if (isLoggedIn) {
      appwrite
        .getCurrentUser()
        .then(response => {
          setIsLoading(false);
          if (response) {
            setIsLoggedIn(true);
          }
        })
        .catch((err: any) => {
          setError(JSON.stringify(err.message));
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [appwrite, isLoggedIn, setIsLoggedIn]);
  if (error) {
    return <ErrorComponent error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Group>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Group>
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Router;
