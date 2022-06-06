import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Cateogories from '../components/Categories';
import CategoriesRecommend from '../components/CategoriesRecommend';
import TopSlick from '../components/TopSlick';

function LandingPage() {
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

      <ScrollView>
        <View style={styles.search}>
          <TextInput style={styles.searchInput} />
          <Feather
            style={styles.searchIcon}
            name="search"
            size={20}
            color={'#00dbc5'}
          />
        </View>
        <TopSlick />
        <CategoriesRecommend />
        <Cateogories />
      </ScrollView>
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
