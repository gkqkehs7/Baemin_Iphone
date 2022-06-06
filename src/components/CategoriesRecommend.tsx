import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const CategoriesRecommend = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.firstImgContainer}>
          <Image
            style={styles.foodImg}
            source={require('../assets/recommends/ddukbbokki.png')}
          />
        </View>

        <View style={styles.imgContainer}>
          <Image
            style={styles.foodImg}
            source={require('../assets/recommends/ddukbbokki.png')}
          />
        </View>

        <View style={styles.imgContainer}>
          <Image
            style={styles.foodImg}
            source={require('../assets/recommends/ddukbbokki.png')}
          />
        </View>

        <View style={styles.imgContainer}>
          <Image
            style={styles.foodImg}
            source={require('../assets/recommends/ddukbbokki.png')}
          />
        </View>

        <View style={styles.imgContainer}>
          <Image
            style={styles.foodImg}
            source={require('../assets/recommends/ddukbbokki.png')}
          />
        </View>

        <View style={styles.lastImgContainer}>
          <Image
            style={styles.foodImg}
            source={require('../assets/recommends/ddukbbokki.png')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  scrollContainer: {},

  imgContainer: {
    marginRight: 8,
  },
  firstImgContainer: {
    marginLeft: 12,
    marginRight: 8,
  },
  lastImgContainer: {
    marginRight: 12,
  },
  foodImg: {
    borderRadius: 10,
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 5.5,
  },
});

export default CategoriesRecommend;
