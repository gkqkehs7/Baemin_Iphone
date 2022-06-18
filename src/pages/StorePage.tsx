import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import {useSelector} from 'react-redux';
import {LoggedInParamList} from '../../AppInner';
import Menues from '../components/StorePage/Menues';
import Reviews from '../components/StorePage/Reviews';
import {RootState} from '../store/reducer';

type StorePageProps = NativeStackScreenProps<LoggedInParamList, 'StorePage'>;
const StorePage = ({route, navigation}: StorePageProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const cart = useSelector((state: RootState) => state.user.cart);

  const {storeId} = route.params;
  const [storeData, setStoreData] = useState({
    PriceToOrder: 0,
    orderTime: '',
    orderTip: '',
    menuImg: '',
    storeName: '',
    id: 0,
  });
  const [menuData, setMenuData] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [swipe, setSwipe] = useState(false);

  useEffect(() => {
    axios
      .get(`${Config.API_URL}/api/store/getStore/${storeId}`, {
        headers: {authorization: `${accessToken}`},
      })
      .then(response => {
        setStoreData(response.data.store);
        setMenuData(response.data.menu);
        setIsFollow(response.data.isFollow);
      });
  }, [storeId, accessToken]);

  const follow = useCallback(async () => {
    if (isFollow) {
      await axios
        .post(
          `${Config.API_URL}/api/user/unfollowStore`,
          {
            storeId: storeData.id,
          },
          {
            headers: {authorization: `${accessToken}`},
          },
        )
        .then(response => {
          setIsFollow(prev => !prev);
          console.log(response.data);
        });
    } else {
      await axios
        .post(
          `${Config.API_URL}/api/user/followStore`,
          {
            storeId: storeData.id,
          },
          {
            headers: {authorization: `${accessToken}`},
          },
        )
        .then(response => {
          setIsFollow(prev => !prev);
          console.log(response.data);
        });
    }
  }, [accessToken, storeData, isFollow]);

  const swiping = useCallback(() => {
    setSwipe(!swipe);
  }, [swipe]);

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
              <Text style={styles.storeName}>{storeData.storeName}</Text>

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

        <View style={styles.swipe}>
          <Pressable
            style={swipe ? styles.whenReviewMenu : styles.whenMenuMenu}
            onPress={swiping}>
            <Text style={styles.swipeText}>메뉴</Text>
          </Pressable>
          <Pressable
            style={swipe ? styles.whenReviewReView : styles.whenMenuReview}
            onPress={swiping}>
            <Text style={styles.swipeText}>리뷰</Text>
          </Pressable>
        </View>

        {swipe ? (
          <Reviews storeId={storeId} />
        ) : (
          <Menues menuData={menuData} storeData={storeData} />
        )}
      </ScrollView>

      <Pressable
        style={styles.cartBtn}
        onPress={() => {
          navigation.navigate('CartPage');
        }}>
        {cart.length > 0 && (
          <View style={styles.cartNum}>
            <Text style={styles.cartNumText}>{cart.length}</Text>
          </View>
        )}

        <AntDesign name="shoppingcart" size={25} color="white" />
      </Pressable>
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

  swipe: {
    flexDirection: 'row',
    backgroundColor: 'white',

    width: Dimensions.get('window').width,
  },
  swipeBtn: {
    borderTopWidth: 2,
    borderTopColor: 'black',
    alignItems: 'center',
    paddingVertical: 20,
    flex: 1,
  },

  whenMenuMenu: {
    flex: 1,
    borderTopWidth: 3,
    borderTopColor: 'black',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whenMenuReview: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderLeftWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  whenReviewReView: {
    flex: 1,
    borderTopWidth: 3,
    borderTopColor: 'black',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whenReviewMenu: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
  },

  swipeText: {},
  cartNum: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: 'white',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    zIndex: 99,
  },
  cartNumText: {
    color: '#00dbc5',
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
function createBottomTabNavigator() {
  throw new Error('Function not implemented.');
}
