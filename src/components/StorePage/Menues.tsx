import React, {FC} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootState} from '../../store/reducer';
import {useSelector} from 'react-redux';
import {IStoreData, IMenuData} from '../../types/db';

interface Props {
  menuData: IMenuData[];
  storeData: IStoreData;
}
const Menues: FC<Props> = ({menuData, storeData}) => {
  const navigation = useNavigation<NavigationProp>();

  const cart = useSelector((state: RootState) => state.user.cart);
  console.log('Cart', cart);
  return (
    <>
      {menuData?.map(item => (
        <Pressable
          key={item.menuName}
          style={styles.menu}
          onPress={() => {
            console.log('item', item);
            navigation.navigate('MenuDetailPage', {
              menuData: item,
              storeData: storeData,
            });
          }}>
          <View>
            <Text style={styles.menuName}>{item.menuName}</Text>
            <Text style={styles.menuEx}>{item.explanation}</Text>
            <Text style={styles.menuPrice}>{item.price}원</Text>
          </View>

          <View>
            <Image
              style={styles.menuImg}
              source={require('../../assets/bbq_chicken.png')}
            />
          </View>
        </Pressable>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: '#e8e8e8',
  },
  menuName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  menuEx: {
    marginVertical: 10,
  },
  menuPrice: {},
  menuImg: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
  },
});

export default Menues;
