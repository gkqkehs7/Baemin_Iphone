import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import axios from 'axios';
import Config from 'react-native-config';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import {useAppDispatch} from '../../store';
// import storeSlice from '../../slices/store';

interface Item {
  item: {
    id: number;
    storeName: string;
    PriceToOrder: number;
    orderTip: string;
  };
}
const Category1 = () => {
  const navigation = useNavigation();

  const [storeData, setStoreData] = useState([]);
  useEffect(() => {
    axios.get(`${Config.API_URL}/api/store/getCategory/1`).then(response => {
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
          source={require('../../assets/bbq.png')}
          resizeMode="contain"
        />
      </View>

      <View>
        <Text style={styles.name}>{item.storeName}</Text>
        <Text style={styles.menu}>(100+) ((인기)) 치즈슈플레</Text>
        <Text style={styles.price}>
          최소주문 {item.PriceToOrder}원, 배달틸 {item.orderTip}
        </Text>
        <Text style={styles.etc}>기타</Text>
      </View>
    </Pressable>
  );

  console.log(storeData);
  return (
    <View style={styles.storeContainer}>
      <FlatList
        data={storeData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />

      <View style={styles.cartBtn}>
        <AntDesign name="shoppingcart" size={25} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

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
});

export default Category1;
