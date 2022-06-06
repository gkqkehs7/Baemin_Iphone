import {ParamListBase, RouteProp} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';

import Config from 'react-native-config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Menues from '../components/StorePage/Menues';

type Props = {
  route: RouteProp<ParamListBase>;
};
const StorePage = ({route}: Props) => {
  const {storeId} = route.params;
  const [storeData, setStoreData] = useState({
    PriceToOrder: 0,
    orderTime: '',
    orderTip: '',
    menuImg: '',
  });
  const [menuData, setMenuData] = useState([]);

  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    axios
      .get(`${Config.API_URL}/api/store/getStore/${storeId}`)
      .then(response => {
        setStoreData(response.data.store);
        setMenuData(response.data.menu);
      });
  }, [storeId]);

  const follow = useCallback(() => {
    setIsFollow(prev => !prev);
  }, []);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/bbq_chicken.png')}
          style={styles.img}
        />

        <View style={{backgroundColor: 'white', marginBottom: 15}}>
          <View style={{alignItems: 'center', height: 150}}>
            <View style={styles.logoContainer}>
              <Text style={styles.storeName}>가게이름</Text>

              <View style={styles.star}>
                <AntDesign name="staro" size={25} />
                <AntDesign name="staro" size={25} />
                <AntDesign name="staro" size={25} />
                <AntDesign name="staro" size={25} />
                <AntDesign name="staro" size={25} />
                <Text style={styles.starText}>5.0</Text>
              </View>

              <View style={styles.review}>
                <Text>리뷰 개수, 사장님 댓글 개수</Text>
              </View>

              <Pressable style={styles.follow} onPress={follow}>
                {isFollow ? (
                  <AntDesign name="heart" size={18} color={'red'} />
                ) : (
                  <AntDesign name="hearto" size={18} />
                )}
                <Text style={styles.starText}>찜 개수</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.storeData}>
            <View>
              <Text style={styles.storeDataText}>최소 주문 금액</Text>
              <Text style={styles.storeDataText}>결제 방법</Text>
              <Text style={styles.storeDataText}>배달 시간</Text>
              <Text style={styles.storeDataText}>배달팁</Text>
            </View>

            <View style={styles.storeDataRight}>
              <Text style={styles.storeDataText}>
                {storeData.PriceToOrder}원
              </Text>
              <Text style={styles.storeDataText}>바로결제, 만나서결제</Text>
              <Text style={styles.storeDataText}>{storeData.orderTime}</Text>
              <Text style={styles.storeDataText}>{storeData.orderTip}</Text>
            </View>
          </View>
        </View>

        <Menues menuData={menuData} />
      </ScrollView>

      <View style={styles.cartBtn}>
        <AntDesign name="shoppingcart" size={25} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    zIndex: 9999,
    opacity: 0.3,
  },
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.5,
  },

  logoContainer: {
    position: 'absolute',
    alignItems: 'center',

    width: Dimensions.get('window').width * 0.93,
    top: -20,
    backgroundColor: 'white',
    borderRadius: 5,

    shadowColor: '#000000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,

    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  storeName: {
    fontSize: 30,
  },

  star: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  starText: {
    marginLeft: 3,
  },

  review: {
    marginBottom: 15,
  },
  follow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  storeData: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    paddingVertical: 20,
  },
  storeDataRight: {
    marginLeft: 7,
  },
  storeDataText: {
    marginVertical: 5,
  },

  cartBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#00dbc5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    right: 20,
    bottom: 40,
  },
});

export default StorePage;
