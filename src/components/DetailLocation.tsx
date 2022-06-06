import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect, useCallback, FC} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type Props = {
  route: {
    params: {
      address: string;
    };
  };
};
const DetailLocation: FC<Props> = ({route}) => {
  const {address} = route.params;

  const navigation = useNavigation();

  const toMap = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.Top}>
        <Text style={styles.TopText}>상세 정보 입력</Text>
        <Pressable style={styles.back} onPress={toMap}>
          <Ionicons name="arrow-back" color={'black'} size={20} />
        </Pressable>
      </View>

      <View style={{flex: 1}}>
        <View style={styles.contents}>
          <Text style={styles.address}>{address}</Text>

          <View style={styles.detailInput}>
            <TextInput placeholder="상세 주소 입력" />
          </View>

          <View style={styles.IconBtns}>
            <Pressable style={styles.IconBtnM}>
              <FontAwesome5 name="house-user" style={styles.Icon} />
              <Text>우리집</Text>
            </Pressable>

            <Pressable style={styles.IconBtnM}>
              <AntDesign name="laptop" style={styles.Icon} />
              <Text>회사</Text>
            </Pressable>

            <Pressable style={styles.IconBtn}>
              <Octicons name="location" style={styles.Icon} />
              <Text>기타</Text>
            </Pressable>
          </View>

          <Pressable style={styles.toMap}>
            <View style={styles.toMapIconText}>
              <Entypo
                name="map"
                style={{marginRight: 6}}
                color={'black'}
                size={16}
              />
              <Text style={{color: 'black'}}>지도에서 위치 확인</Text>
            </View>

            <View>
              <AntDesign name="right" size={15} />
            </View>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.completeBtn} onPress={toMap}>
        <Text style={styles.completeBtnText}>완료</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  Top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 13,
  },
  TopText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  back: {
    position: 'absolute',
    left: 12,
    bottom: 10,
    margin: 'auto',
    width: '50%',
  },

  contents: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingTop: 10,
  },
  address: {
    marginHorizontal: 12,
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },

  detailInput: {
    marginVertical: 10,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e9e9e9',

    borderRadius: 5,
    paddingHorizontal: 5,
  },

  IconBtns: {
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  IconBtnM: {
    flex: 1,
    height: 60,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#e9e9e9',
    marginRight: 7,
  },
  IconBtn: {
    flex: 1,
    height: 60,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  Icon: {
    marginBottom: 3,
  },

  toMap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 12,
  },
  toMapIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  completeBtn: {
    height: 40,
    backgroundColor: '#00dbc5',
    borderRadius: 3,
    marginHorizontal: 12,
    marginBottom: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailLocation;
