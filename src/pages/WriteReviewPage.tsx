import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import StarRating from 'react-native-star-rating';

import {LoggedInParamList} from '../../AppInner';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
type WriteReviewPageProps = NativeStackScreenProps<
  LoggedInParamList,
  'WriteReviewPage'
>;

type Iimage = {
  uri: string;
};

const WriteReviewPage = ({navigation, route}: WriteReviewPageProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    // axios
    //   .post(
    //     `${Config.API_URL}/api/user/getHistories`,
    //     {},
    //     {
    //       headers: {authorization: `${accessToken}`},
    //     },
    //   )
    //   .then(response => {
    //     console.log(response.data);
    //     setHistories(response.data);
    //   });
  }, [accessToken]);

  const [starCount, setStarCount] = useState(0);

  const [images, setImages] = useState<Iimage[]>([]);
  const [content, setContent] = useState('');
  const onStarRatingPress = useCallback((rating: number) => {
    setStarCount(rating);
  }, []);

  const onChangeContent = useCallback((text: string) => {
    setContent(text);
  }, []);

  const uploadPhoto = useCallback(
    async response => {
      console.log(response.width, response.height, response.exif);
      setImages([
        ...images,
        {uri: `data:${response.mime};base64,${response.data}`},
      ]);

      const orientation = (response.exif as any)?.Orientation;
      console.log('orientation', orientation);
      return ImageResizer.createResizedImage(
        response.path,
        600,
        600,
        response.mime.includes('jpeg') ? 'JPEG' : 'PNG',
        100,
        0,
      ).then(r => {
        console.log(r.uri, r.name);

        // setImage({
        //   uri: r.uri,
        //   name: r.name,
        //   type: response.mime,
        // });
      });
    },
    [images],
  );

  console.log(images.length);
  const toPhoto = () => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      if (result === RESULTS.DENIED) {
        return ImagePicker.openPicker({
          includeExif: true,
          includeBase64: true,
          mediaType: 'photo',
        });
      } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        return Alert.alert(
          '앨범 접근 권한을 허용해주세요',
          '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
          [
            {
              text: '네',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '아니오',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
        );
      } else {
        if (images.length === 3) {
          return Alert.alert('이미지는 3개 까지만 선택할 수 있습니다');
        }
        return ImagePicker.openPicker({
          includeExif: true,
          includeBase64: true,
          mediaType: 'photo',
        })
          .then(uploadPhoto)
          .catch(console.log);
      }
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.top}>
        <Text style={styles.topText}>주문 내역</Text>
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

      <View style={styles.storeName}>
        <Text style={styles.storeNameText}>가게이름</Text>
      </View>

      <StarRating
        rating={starCount}
        fullStarColor="#ffd700"
        selectedStar={rating => onStarRatingPress(rating)}
        containerStyle={{marginHorizontal: 60, marginVertical: 20}}
      />

      <View style={styles.content}>
        <TextInput
          multiline={true}
          maxLength={200}
          placeholder="리뷰를 작성해주세요!"
          onChangeText={onChangeContent}
        />
      </View>

      <View style={styles.photos}>
        <Pressable onPress={toPhoto} style={styles.toPhoto}>
          <SimpleLineIcons name="camera" size={30} />
        </Pressable>

        {images[0] && (
          <View style={styles.photo}>
            <Image style={styles.photo} source={images[0]} />
          </View>
        )}
        {images[1] && (
          <View style={styles.photo}>
            <Image style={styles.photo} source={images[1]} />
          </View>
        )}
        {images[2] && (
          <View style={styles.photo}>
            <Image style={styles.photo} source={images[2]} />
          </View>
        )}
      </View>

      <View style={{alignItems: 'center'}}>
        <Pressable style={styles.reviewComplete}>
          <Text style={styles.reviewCompleteText}>작성 완료</Text>
        </Pressable>
      </View>
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

  storeName: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeNameText: {
    fontSize: 25,
    fontWeight: '600',
  },
  content: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
    height: 150,
  },

  photos: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    flex: 1,
  },
  photo: {
    borderRadius: 10,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
  },
  toPhoto: {
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
    borderWidth: 1,

    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
  },
  previewImage: {
    width: 150,
    height: 150,
  },

  reviewComplete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    backgroundColor: '#00dbc5',
    borderRadius: 5,
  },

  reviewCompleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default WriteReviewPage;
