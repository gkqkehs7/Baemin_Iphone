import {ParamListBase, RouteProp} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Config from 'react-native-config';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  route: RouteProp<ParamListBase>;
};
const StorePage = ({route}: Props) => {
  const {storeId} = route.params;
  const [storeData, setStoreData] = useState({});
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

  console.log(storeData);
  console.log(menuData);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          console.log(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={1}>
        <View style={styles.header}>
          <SafeAreaView style={{backgroundColor: 'white'}} />
          <Text>header</Text>
        </View>

        <View>
          <Image
            source={require('../assets/bbq_chicken.png')}
            style={styles.img}
          />
        </View>

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

              <Pressable
                style={styles.follow}
                onPress={() => {
                  setIsFollow(prev => !prev);
                }}>
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
              <Text style={styles.storeDataText}>최소 주문 금액</Text>
              <Text style={styles.storeDataText}>결제 방법</Text>
              <Text style={styles.storeDataText}>배달 시간</Text>
              <Text style={styles.storeDataText}>배달팁</Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          <View style={styles.menuText}>
            <Text>메뉴 제목</Text>
            <Text>메뉴 설명</Text>
            <Text>가격</Text>
          </View>

          <View>
            <Image
              style={styles.menuImg}
              source={require('../assets/bbq_chicken.png')}
            />
          </View>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuText}>
            <Text>메뉴 제목</Text>
            <Text>메뉴 설명</Text>
            <Text>가격</Text>
          </View>

          <View>
            <Image
              style={styles.menuImg}
              source={require('../assets/bbq_chicken.png')}
            />
          </View>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuText}>
            <Text>메뉴 제목</Text>
            <Text>메뉴 설명</Text>
            <Text>가격</Text>
          </View>

          <View>
            <Image
              style={styles.menuImg}
              source={require('../assets/bbq_chicken.png')}
            />
          </View>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuText}>
            <Text>메뉴 제목</Text>
            <Text>메뉴 설명</Text>
            <Text>가격</Text>
          </View>

          <View>
            <Image
              style={styles.menuImg}
              source={require('../assets/bbq_chicken.png')}
            />
          </View>
        </View>
      </ScrollView>
    </>
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
  menuText: {},
  menuImg: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
  },
});

export default StorePage;
