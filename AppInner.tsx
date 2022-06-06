import React, {useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import LandingPage from './src/pages/LandingPage';
import StartPage from './src/pages/StartPage';
import CategoryPage from './src/pages/CategoryPage';
import StorePage from './src/pages/StorePage';
import MenuDetailPage from './src/pages/MenuDetailPage';
import SignInPage from './src/pages/SignInPage';
import SignUpPage from './src/pages/SignUpPage';
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  SignInPage: undefined;
  SignUpPage: undefined;
  StartPage: undefined;
};

function AppInner() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="CategoryPage" component={CategoryPage} />
          <Stack.Screen name="StorePage" component={StorePage} />
          <Stack.Screen name="MenuDetailPage" component={MenuDetailPage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="SignInPage" component={SignInPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
        </Stack.Navigator>
      )}
    </>
  );
}
export default AppInner;
