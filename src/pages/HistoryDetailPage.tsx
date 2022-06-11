import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import axios from 'axios';
import Config from 'react-native-config';
import {FlatList} from 'react-native-gesture-handler';
import {IMenuData} from '../types/db';

type HistoryDetailPageProps = NativeStackScreenProps<
  LoggedInParamList,
  'HistoryDetailPage'
>;

interface menuData {
  item: IMenuData;
}

const HistoryDetailPage = ({route, navigation}: HistoryDetailPageProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [menuDatas, setMenuDatas] = useState([]);
  const [storeData, setStoreData] = useState({
    storeName: '',
    id: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const renderItem = ({item}: menuData) => (
    <View style={styles.menu}>
      <Text>{item.menuName}</Text>
      <Text>{item.price} 원</Text>
    </View>
  );

  useEffect(() => {
    axios
      .post(
        `${Config.API_URL}/api/user/getHistory`,
        {
          historyId: route.params.historyId,
        },
        {
          headers: {authorization: `${accessToken}`},
        },
      )
      .then(response => {
        console.log(response.data);
        setStoreData(response.data.store);
        setMenuDatas(response.data.menuData);
        setTotalPrice(response.data.totalPrice);
      });
  }, [accessToken, route.params.historyId]);

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

      <View style={styles.container}>
        <Text style={styles.completeText}>배달이 완료되었어요</Text>
        <Text style={styles.storeName}>{storeData.storeName}</Text>

        <Pressable
          style={styles.toStore}
          onPress={() => {
            navigation.navigate('StorePage', {storeId: storeData.id});
          }}>
          <Text>해당 가게로 가기</Text>
        </Pressable>
      </View>

      <FlatList renderItem={renderItem} data={menuDatas} />

      <View style={styles.totalPrice}>
        <Text style={styles.totalPriceText}>총 가격</Text>
        <Text style={styles.totalPriceText}>{totalPrice} 원</Text>
      </View>

      <Pressable style={styles.deleteHistory}>
        <Text style={styles.deleteHistoryText}>주문 내역 삭제</Text>
      </Pressable>
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

  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },
  completeText: {
    color: 'gray',
    fontWeight: '700',
    marginBottom: 10,
  },
  storeName: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
  },
  repMenu: {
    marginBottom: 20,
  },
  toStore: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    borderRadius: 5,
  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 15,

    borderBottomWidth: 0.2,
    borderBottomColor: '#e8e8e8',
  },

  totalPrice: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  totalPriceText: {
    fontSize: 25,
    fontWeight: '800',
  },

  deleteHistory: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteHistoryText: {
    color: 'red',
  },
});

export default HistoryDetailPage;
