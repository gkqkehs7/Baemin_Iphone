import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../AppInner';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';

type MenuDetailPageProps = NativeStackScreenProps<
  LoggedInParamList,
  'MenuDetailPage'
>;

const MenuDetailPage = ({navigation, route}: MenuDetailPageProps) => {
  const {menuData} = route.params;
  const {storeData} = route.params;
  const dispatch = useAppDispatch();
  const menuToCart = useCallback(() => {
    dispatch(
      userSlice.actions.menuToCart({
        menuId: menuData.id,
        StoreId: menuData.StoreId,
        explanation: menuData.explanation,
        menuName: menuData.menuName,
        price: menuData.price,
        menuImg: menuData.menuImg,
        PriceToOrder: storeData.PriceToOrder,
        orderTime: storeData.orderTime,
        orderTip: storeData.orderTip,
        storeName: storeData.storeName,
      }),
    );
    navigation.goBack();
  }, [navigation, dispatch, menuData, storeData]);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ImageBackground
        source={require('../assets/bbq_chicken.png')}
        style={styles.img}
      />
      <View style={{alignItems: 'center', flex: 0.9}}>
        <View style={styles.menuText}>
          <Text style={styles.menuName}>{menuData.menuName}</Text>
          <Text style={{marginVertical: 5}}>{menuData.explanation}</Text>
          <Text>{menuData.price}원</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Pressable style={styles.cartBtn} onPress={menuToCart}>
          <Text style={styles.btnText}>장바구니 담기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.5,
  },
  menuText: {
    marginTop: 10,
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
    backgroundColor: 'white',

    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  menuName: {
    fontSize: 20,
    fontWeight: '600',
  },

  cartBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    backgroundColor: '#00dbc5',

    borderRadius: 5,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default MenuDetailPage;
