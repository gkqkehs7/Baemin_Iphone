import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store/reducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import userSlice from '../slices/user';
import {ICartData} from '../types/slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';

interface cartItems {
  item: ICartData;
}

type CartPageProps = NativeStackScreenProps<LoggedInParamList, 'CartPage'>;

const CartPage = ({navigation}: CartPageProps) => {
  const cart = useSelector((state: RootState) => state.user.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const sumTotalPrice = useCallback(() => {
    let price = 0;
    cart.map(item => {
      price += item.price;
    });
    setTotalPrice(price);
  }, [cart]);

  useEffect(() => {
    sumTotalPrice();
  }, [dispatch, sumTotalPrice]);

  const renderItem = ({item}: cartItems) => {
    return (
      <View style={styles.menu}>
        <View style={styles.menuName}>
          <Text style={styles.menuNameText}>{item.menuName}</Text>
          <Pressable
            style={styles.deleteBtn}
            onPress={() => {
              dispatch(
                userSlice.actions.deleteFromCart({
                  menuId: item.menuId,
                }),
              );
            }}>
            <AntDesign name="close" size={20} />
          </Pressable>
        </View>

        <View style={styles.menuInfo}>
          <Image
            source={require('../assets/bbq_chicken.png')}
            style={styles.img}
          />

          <View style={styles.menuInfoText}>
            <Text style={styles.priceText}>가격: {item.price}</Text>
            <Text style={styles.exText}>{item.explanation}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.top}>
        <Text style={styles.topText}>장바구니</Text>
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
      <View style={styles.storeName}>
        <Text style={styles.storeNameText}>{cart[0]?.storeName}</Text>
      </View>

      <FlatList style={styles.menues} renderItem={renderItem} data={cart} />

      <View style={{alignItems: 'center'}}>
        {totalPrice > cart[0]?.PriceToOrder ? (
          <Pressable
            style={styles.cartBtn}
            onPress={() => {
              navigation.navigate('PayPage', {
                totalPrice: totalPrice,
              });
            }}>
            <Text style={styles.btnText}>{totalPrice}원 결제하기</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.disCartBtn} disabled={true}>
            <Text style={styles.btnText}>
              {cart[0]?.PriceToOrder}원 부터 주문할 수 있어요
            </Text>
          </Pressable>
        )}
      </View>
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
  storeName: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  storeNameText: {
    fontSize: 25,
    fontWeight: '700',
  },
  img: {
    borderRadius: 12,
    width: 100,
    height: 100,
  },
  menues: {},
  menu: {
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    borderBottomColor: '#e8e8e8',
  },

  menuName: {
    flexDirection: 'row',
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuNameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  deleteBtn: {},

  menuInfo: {
    flexDirection: 'row',
  },

  menuInfoText: {
    marginHorizontal: 15,
  },

  priceText: {},
  exText: {
    marginTop: 10,
  },

  cartBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    backgroundColor: '#00dbc5',
    borderRadius: 5,
  },

  disCartBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default CartPage;
