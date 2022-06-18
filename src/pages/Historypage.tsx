import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {LoggedInParamList} from '../../AppInner';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

type HistoryPageProps = NativeStackScreenProps<
  LoggedInParamList,
  'HistoryPage'
>;

const HistoryPage = ({navigation}: HistoryPageProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [histories, setHistories] = useState([]);

  console.log(histories);
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

    const canReview =
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    console.log(parseInt(canReview, 10));
    const menuNum = item.menuIds.split(',').length;

    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.history}>
          <View style={styles.historyTop}>
            {today.getFullYear() === date.getFullYear() ? (
              <Text>
                {date.getMonth() + 1}월 {date.getDate()}일
              </Text>
            ) : (
              <Text>
                {date.getFullYear()}일 {date.getMonth()}월 {date.getDate()}일
              </Text>
            )}

            <Pressable
              style={styles.toDetail}
              onPress={() => {
                navigation.navigate('HistoryDetailPage', {
                  historyId: item.historyId,
                });
              }}>
              <Text>주문상세</Text>
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
              </Pressable>

              {menuNum > 1 ? (
                <Text>
                  {item.repMenuName} 외 {menuNum - 1}개 {item.totalPrice}원
                </Text>
              ) : (
                <Text>
                  {item.repMenuName} {item.totalPrice}원
                </Text>
              )}
            </View>
          </View>
        </View>

        {!item.reviewed && canReview < 4 && (
          <Pressable
            style={styles.toReview}
            onPress={() => {
              navigation.navigate('WriteReviewPage', {
                historyId: item.historyId,
                storeId: item.storeId,
                storeName: item.storeName,
                repMenuName: item.repMenuName,
                menuIds: item.menuIds,
              });
            }}>
            <Octicons name="pencil" size={17} />
            <Text style={styles.toReviewText}>
              리뷰 작성하기 ({3 - Math.floor(canReview)}일 남음)
            </Text>
          </Pressable>
        )}
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
    borderBottomColor: '#e8e8e8',
  },
  historyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  toDetail: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'gray',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

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

  toReview: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: 'black',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  toReviewText: {
    marginLeft: 5,
  },
});

export default HistoryPage;
