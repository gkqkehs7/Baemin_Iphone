import React, {useCallback} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import axios from 'axios';
import Config from 'react-native-config';
import {ICartData} from '../types/slice';
import userSlice from '../slices/user';

type PayPageProps = NativeStackScreenProps<LoggedInParamList, 'PayPage'>;

const PayPage = ({navigation, route}: PayPageProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const cart = useSelector((state: RootState) => state.user.cart);
  const {totalPrice} = route.params;
  const dispatch = useDispatch();

  const payAll = useCallback(async () => {
    let menuIds: number[] = [];
    cart.forEach((item: ICartData) => {
      menuIds.push(item.menuId);
    });
    await axios
      .post(
        `${Config.API_URL}/api/user/pay`,
        {
          totalPrice: totalPrice,
          storeId: cart[0]?.StoreId,
          menuIds: menuIds.join(','),
        },
        {
          headers: {authorization: `${accessToken}`},
        },
      )
      .then(response => {
        dispatch(userSlice.actions.deleteAllCart());
        Alert.alert('주문완료 되었습니다');
        return navigation.navigate('LandingPage');
      });
  }, [accessToken, cart, totalPrice, dispatch, navigation]);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.top}>
        <Text style={styles.topText}>결제 페이지</Text>
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

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Pressable style={styles.cartBtn} onPress={payAll}>
          <Text style={styles.btnText}>카카오페이로 결제하기</Text>
        </Pressable>
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

  cartBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    backgroundColor: '#f9e000',
    borderRadius: 5,
  },

  btnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default PayPage;
