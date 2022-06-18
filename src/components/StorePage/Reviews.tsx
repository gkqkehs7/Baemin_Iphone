import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {RootState} from '../../store/reducer';
import {useSelector} from 'react-redux';
import {IStoreData, IMenuData} from '../../types/db';
import axios from 'axios';
import Config from 'react-native-config';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  menuData: IMenuData[];
  storeData: IStoreData;
}

interface IReviewImage {
  src: string;
}
const Reviews = ({storeId}) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      await axios
        .get(`${Config.API_URL}/api/review/getReviews/${storeId}`, {
          headers: {authorization: `${accessToken}`},
        })
        .then(response => {
          setReviews(response.data);
          setLoading(true);
        });
    };
    getReviews();
  }, [storeId, accessToken]);

  const reviewImage = useCallback((reviewImages: IReviewImage[]) => {
    if (reviewImages.length === 1) {
      return (
        <View style={styles.reviewImages}>
          <Image
            style={styles.reviewImage1}
            source={{uri: reviewImages[0].src}}
          />
        </View>
      );
    } else if (reviewImages.length === 2) {
      return (
        <View style={styles.reviewImages}>
          <Image
            style={styles.reviewImage2}
            source={{uri: reviewImages[0].src}}
          />
          <Image
            style={styles.reviewImage2}
            source={{uri: reviewImages[1].src}}
          />
        </View>
      );
    } else {
      console.log(reviewImages[0].src);
      return (
        <View style={styles.reviewImages}>
          <View style={styles.reviewImagesTop}>
            <Image
              style={styles.reviewImagesTL}
              source={{uri: reviewImages[0].src}}
            />
            <Image
              style={styles.reviewImagesTR}
              source={{uri: reviewImages[1].src}}
            />
          </View>
          <Image
            style={styles.reviewImageBottom}
            source={{uri: reviewImages[2].src}}
          />
        </View>
      );
    }
  }, []);

  const star = useCallback((starCount: number) => {
    var stars = [];
    for (var i = 0; i < starCount; i++) {
      stars.push(<AntDesign name="star" color="#ffd700" size={15} />);
    }

    for (var i = 0; i < 5 - starCount; i++) {
      stars.push(<AntDesign name="staro" color="gray" size={15} />);
    }
    return stars;
  }, []);

  const renderItem = ({item}) => {
    const date = new Date(item.createdAt);
    const today = new Date();

    console.log(item.ReviewImages);

    return (
      <View style={styles.review}>
        <View style={styles.reviewTop}>
          <Image
            style={styles.userProfile}
            source={require('../../assets/user.png')}
          />

          <View style={styles.reviewTopRight}>
            <Text style={styles.userNickname}>{item.User.nickname}</Text>

            <View style={styles.starAndDate}>
              <View style={styles.star}>{star(item.star)}</View>
              <View>
                {today.getFullYear() === date.getFullYear() ? (
                  <Text>
                    {date.getMonth() + 1}월 {date.getDate()}일
                  </Text>
                ) : (
                  <Text>
                    {date.getFullYear()}일 {date.getMonth()}월 {date.getDate()}
                    일
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {item.ReviewImages.length > 0 && reviewImage(item.ReviewImages)}

        <View style={styles.reviewBottom}>
          <View>
            <Text>{item.content}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {loading ? (
        <FlatList renderItem={renderItem} data={reviews} />
      ) : (
        <View>
          <Text>로딩중</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  review: {
    paddingVertical: 30,
  },
  reviewTop: {
    flexDirection: 'row',
    marginHorizontal: Dimensions.get('window').width * 0.05,
  },
  reviewTopRight: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  userProfile: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },

  userNickname: {
    fontSize: 17,
    fontWeight: '600',
  },
  starAndDate: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    flexDirection: 'row',
    marginRight: 5,
  },

  reviewImages: {
    alignItems: 'center',
    marginTop: 15,
  },
  reviewImage1: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.7,
  },
  reviewImage2: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.35,
    marginBottom: 5,
  },

  reviewImagesTop: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  reviewImagesTL: {
    width: Dimensions.get('window').width * 0.44,
    height: Dimensions.get('window').width * 0.35,
    marginRight: Dimensions.get('window').width * 0.01,
  },
  reviewImagesTR: {
    width: Dimensions.get('window').width * 0.44,
    height: Dimensions.get('window').width * 0.35,
    marginLeft: Dimensions.get('window').width * 0.01,
  },
  reviewImageBottom: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.35,
  },

  reviewBottom: {
    marginTop: 20,
    marginHorizontal: Dimensions.get('window').width * 0.05,
  },
});

export default Reviews;
