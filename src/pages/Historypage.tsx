import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import axios from 'axios';
import Config from 'react-native-config';
import {FlatList} from 'react-native-gesture-handler';

type HistoryPageProps = NativeStackScreenProps<
  LoggedInParamList,
  'HistoryPage'
>;

const HistoryPage = ({navigation}: HistoryPageProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${Config.API_URL}/api/user/getHistories`,
        {},
        {
          headers: {authorization: `${accessToken}`},
        },
      )
      .then(response => {
        console.log(response.data);
        setHistories(response.data);
      });
  }, [accessToken]);

  const renderItem = ({item}) => {
    const date = new Date(item.time);
    const today = new Date();

    const menuNum = item.menuIds.split(',').length;

    return (
      <View style={styles.history}>
        <View style={styles.historyTop}>
          {today.getFullYear() === date.getFullYear() ? (
            <Text style={styles.passedDate}>
              {date.getMonth()}월 {date.getDay()}일
            </Text>
          ) : (
            <Text style={styles.passedDate}>
              {date.getFullYear()}일 {date.getMonth()}월 {date.getDay()}일
            </Text>
          )}

          <Pressable
            style={styles.toDetail}
            onPress={() => {
              navigation.navigate('HistoryDetailPage', {
                historyId: item.historyId,
              });
            }}>
            <Text style={styles.toDetailText}>주문상세</Text>
          </Pressable>
        </View>

        <View style={styles.historyBottom}>
          <Image
            style={styles.storeImg}
            source={require('../assets/bbq_chicken.png')}
          />

          <View style={styles.historyBottomRight}>
            <Pressable style={styles.toStore}>
              <Text style={styles.toStoreText}>{item.storeName}</Text>
              <AntDesign name="right" style={styles.toStoreIcon} />
            </Pressable>

            {menuNum > 1 ? (
              <Text style={styles.repMenu}>
                {item.repMenuName} 외 {menuNum - 1}개 {item.totalPrice}원
              </Text>
            ) : (
              <Text style={styles.repMenu}>
                {item.repMenuName} {item.totalPrice}원
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.top}>
        <Text style={styles.topText}>주문 내역</Text>
        <Pressable style={styles.backIcon}>
          <Ionicons
            name="arrow-back"
            size={20}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </Pressable>
      </View>

      <FlatList renderItem={renderItem} data={histories} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e8e8e8',
  },
  topText: {
    fontSize: 15,
    fontWeight: '700',
  },
  backIcon: {
    position: 'absolute',
    left: 15,
    botoom: 15,
  },

  history: {
    width: Dimensions.get('window').width,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E8E8',
  },
  historyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passedDate: {},
  toDetail: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'gray',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  toDetailText: {},

  historyBottom: {
    flexDirection: 'row',
    marginTop: 15,
  },
  storeImg: {
    borderRadius: 12,
    width: 80,
    height: 80,
  },
  historyBottomRight: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  toStore: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  toStoreText: {
    fontWeight: '700',
    marginRight: 5,
    fontSize: 17,
  },
  toStoreIcon: {},
  repMenu: {},
});

export default HistoryPage;
