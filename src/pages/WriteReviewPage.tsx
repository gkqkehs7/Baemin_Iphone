import React, {useCallback, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
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
  const [content, setContent] = useState('');
  const [starCount, setStarCount] = useState(0);
  const [images, setImages] = useState<Iimage[]>([]);
  const [s3ImagesPath, setS3ImagesPath] = useState<Iimage[]>([]);
  const [loading, setLoading] = useState(false);

  const onStarRatingPress = useCallback((rating: number) => {
    setStarCount(rating);
  }, []);

  const onChangeContent = useCallback((text: string) => {
    setContent(text);
  }, []);

  const uploadPhoto = useCallback(
    async response => {
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
      ).then(async r => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', {
          uri: r.uri,
          name: r.name,
          type: response.mime,
        });

        await axios
          .post(`${Config.API_URL}/api/review/reviewImages`, formData, {
            headers: {authorization: `${accessToken}`},
          })
          .then(response => {
            setS3ImagesPath([...s3ImagesPath, {path: response.data.filePath}]);
            setLoading(false);
          });
      });
    },
    [accessToken, images, s3ImagesPath],
  );

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
          '?????? ?????? ????????? ??????????????????',
          '??? ?????? ????????? ????????? ?????? ???????????? ???????????????.',
          [
            {
              text: '???',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '?????????',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
          ],
        );
      } else {
        if (images.length === 3) {
          return Alert.alert('???????????? 3??? ????????? ????????? ??? ????????????');
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

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }

    if (content.trim() === '') {
      return Alert.alert('??????', '?????? ?????? ??????????????????!');
    }
    if (starCount === 0) {
      return Alert.alert('??????', '????????? ???????????????!');
    }

    await axios
      .post(
        `${Config.API_URL}/api/review/writeReview`,
        {
          star: starCount,
          content: content,
          s3ImagesPath: s3ImagesPath,
          storeId: route.params.storeId,
          historyId: route.params.historyId,
        },
        {
          headers: {authorization: `${accessToken}`},
        },
      )
      .then(response => {
        Alert.alert('??????', '?????? ????????? ?????? ???????????????');
        navigation.navigate('LandingPage');
      });
  }, [
    accessToken,
    content,
    route.params.historyId,
    route.params.storeId,
    s3ImagesPath,
    starCount,
    loading,
    navigation,
  ]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.top}>
        <Text style={styles.topText}>?????? ??????</Text>
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
        <Text style={styles.storeNameText}>????????????</Text>
      </View>

      <StarRating
        rating={starCount}
        fullStarColor="#ffd700"
        selectedStar={rating => onStarRatingPress(rating)}
        containerStyle={{marginHorizontal: 60, marginVertical: 20}}
      />

      <View style={styles.content}>
        <TextInput
          value={content}
          multiline={true}
          maxLength={200}
          placeholder="????????? ??????????????????!"
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
        <Pressable style={styles.reviewComplete} onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.reviewCompleteText}>?????? ??????</Text>
          )}
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
