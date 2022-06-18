import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';
import Config from 'react-native-config';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LoggedInParamList} from '../../AppInner';

import {IStoreData} from '../types/db';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useAppDispatch} from '../../store';
// import storeSlice from '../../slices/store';

interface Item {
  item: IStoreData;
}
const StoresPage = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const cart = useSelector((state: RootState) => state.user.cart);

  const [storeData, setStoreData] = useState([]);
  useEffect(() => {
    axios.get(`${Config.API_URL}/api/store/getStores`).then(response => {
      console.log(response.data[0].Menus);
      setStoreData(response.data);
    });
  }, []);

  const toStore = useCallback(
    (storeId: number) => {
      navigation.navigate('StorePage', {storeId: storeId});
    },
    [navigation],
  );

  const renderItem = ({item}: Item) => (
    <Pressable style={styles.itemContainer} onPress={() => toStore(item.id)}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require('../assets/bbq.png')}
          resizeMode="contain"
        />
      </View>

      <View>
        <Text style={styles.name}>{item.storeName}</Text>
        <Text style={styles.menu}>(100+) ((인기)) 치즈슈플레</Text>
        <Text style={styles.price}>
          최소주문 {item.PriceToOrder}원, 배달틸 {item.orderTip}
        </Text>
      </View>
    </Pressable>
  );

  console.log(storeData);
  return (
    <SafeAreaView style={styles.storeContainer}>
      <View style={styles.top}>
        <Text style={styles.topText}>주문하기</Text>
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

      <FlatList data={storeData} renderItem={renderItem} />

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

  storeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  imgContainer: {
    marginRight: 8,
    borderRadius: 10,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#808080',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,

    borderBottomWidth: 0.2,
    borderBottomColor: '#808080',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  menu: {
    color: '#808080',
    marginBottom: 3,
  },
  price: {
    marginBottom: 3,
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
});

export default StoresPage;
