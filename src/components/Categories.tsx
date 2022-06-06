import React, {useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Cateogories = () => {
  const navigation = useNavigation();

  const toCategoryPage = useCallback(() => {
    navigation.navigate('CategoryPage');
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable style={styles.iconContainer} onPress={toCategoryPage}>
            <Image source={item.src} style={styles.icon} resizeMode="contain" />
            <View>
              <Text style={styles.iconText}>{item.title}</Text>
            </View>
          </Pressable>
        )}
        numColumns={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 50,
  },
  iconText: {
    color: 'black',
  },
});

const data = [
  {
    title: '햄버거',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '중식',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '치킨',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '백반',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '카페',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '분식',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '찌개',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '피자',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '양식',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '도시락',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '햄버거',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '햄버거',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '햄버거',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '햄버거',
    src: require('../assets/foodIcon/hambuger.png'),
  },
  {
    title: '햄버거',
    src: require('../assets/foodIcon/hambuger.png'),
  },
];
export default Cateogories;
