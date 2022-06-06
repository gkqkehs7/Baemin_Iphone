import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

function SettingLocation() {
  const navigation = useNavigation();

  const toMap = useCallback(() => {
    navigation.navigate('MyLocation');
  }, []);

  return (
    <View style={styes.Container}>
      <View style={{backgroundColor: 'white', paddingBottom: 12}}>
        <View style={styes.Top}>
          <Text style={styes.TopText}>주소 설정</Text>
        </View>

        <View style={styes.SearchContainer}>
          <TextInput />
          <Feather style={styes.SearchIcon} name="search" size={20} />
        </View>

        <Pressable style={styes.ToMap} onPress={toMap}>
          <View style={styes.ToMapLeft}>
            <MaterialIcons
              style={{marginRight: 4}}
              name="location-searching"
              size={20}
              color={'black'}
            />
            <Text style={{color: 'black'}}>현재 위치로 설정</Text>
          </View>

          <View>
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default SettingLocation;

const styes = StyleSheet.create({
  Container: {
    flex: 1,
  },

  Top: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 20,
    marginBottom: 10,
  },
  TopText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  EditBtn: {},

  SearchContainer: {
    backgroundColor: '#e9e9e9',
    height: 40,
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,

    paddingHorizontal: 32,
  },
  SearchIcon: {
    position: 'absolute',
    top: 10,
    left: 12,
  },

  ToMap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  ToMapLeft: {
    flexDirection: 'row',
    color: 'black',
  },
  ToMapRight: {},
});
