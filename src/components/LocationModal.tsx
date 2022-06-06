import React, {useState, useRef, RefObject, useEffect} from 'react';
import {Dimensions, Text, TextInput, View} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {Portal} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyLocation from './MyLocation';
import SettingLocation from './SettingLocation';
import DetailLocation from './DetailLocation';
const Stack = createNativeStackNavigator();

const LocationModal = React.forwardRef((props, modalizeRef: any) => {
  return (
    <>
      <Modalize
        ref={modalizeRef}
        modalStyle={{
          backgroundColor: 'red',
        }}
        scrollViewProps={{
          contentContainerStyle: {flex: 1},
        }}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="SettingLocation"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SettingLocation" component={SettingLocation} />
            <Stack.Screen name="MyLocation" component={MyLocation} />
            <Stack.Screen name="DetailLocation" component={DetailLocation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Modalize>
    </>
  );
});

export default LocationModal;
