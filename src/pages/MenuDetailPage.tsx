import {useNavigation, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MenuDetailPage = ({route}) => {
  const navigation = useNavigation<NavigationProp>();
  console.log('menudaaaa', route.params.menuData);

  const {menuData} = route.params;
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
        <Pressable
          style={styles.cartBtn}
          onPress={() => {
            navigation.goBack();
          }}>
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
