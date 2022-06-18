import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Cateogories from '../components/Categories';
import CategoriesRecommend from '../components/CategoriesRecommend';
import {LoggedInParamList} from '../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type LandingPageProps = NativeStackScreenProps<
  LoggedInParamList,
  'LandingPage'
>;

function LandingPage({navigation}: LandingPageProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* to map */}
        <View style={styles.top}>
          <View>
            <MaterialIcons name="restaurant-menu" size={25} />
          </View>

          <Pressable>
            <Text>toMap</Text>
          </Pressable>

          <View style={styles.topRight}>
            <Fontisto name="bell" size={25} style={{marginRight: 10}} />
            <Entypo name="emoji-flirt" size={25} />
          </View>
        </View>
      </View>

      <View style={{}}>
        <View style={styles.search}>
          <TextInput style={styles.searchInput} />
          <Feather
            style={styles.searchIcon}
            name="search"
            size={20}
            color={'#00dbc5'}
          />
        </View>

        {/* <Cateogories /> */}
      </View>
      <CategoriesRecommend />

      <View style={{backgroundColor: 'white', alignItems: 'center'}}>
        <Pressable
          style={styles.toOrder}
          onPress={() => {
            navigation.navigate('StoresPage');
          }}>
          <Text style={styles.toOrderText}>주문하기</Text>
        </Pressable>

        <Pressable
          style={styles.toHistory}
          onPress={() => {
            navigation.navigate('HistoryPage');
          }}>
          <Text style={styles.toHistoryText}>주문 내역</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00dbc5',
  },
  header: {
    backgroundColor: '#00dbc5',
    justifyContent: 'flex-end',
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  topRight: {
    flexDirection: 'row',
  },

  search: {
    height: 55,
    backgroundColor: '#00dbc5',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    height: 40,
    marginHorizontal: 10,
    paddingLeft: 30,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 9,
  },

  toOrder: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width * 0.95,
    height: 100,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#00dbc5',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  toOrderText: {
    fontSize: 20,
    fontWeight: '700',
  },

  toHistory: {
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width * 0.95,
    height: 70,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#00dbc5',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  toHistoryText: {
    fontSize: 20,
    fontWeight: '700',
  },

  myLocationModal: {
    backgroundColor: 'orange',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default LandingPage;
