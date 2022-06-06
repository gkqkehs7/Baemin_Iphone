import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';

type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'StartPage'>;

function StartPage({navigation}: StartScreenProps) {
  const kakaoLogin = useCallback(async () => {}, []);
  const localLogin = useCallback(async () => {
    navigation.navigate('SignInPage');
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={require('../assets/textLogo.png')} />
      </View>

      <View style={styles.loginButtons}>
        <Pressable onPress={kakaoLogin}>
          <Image
            source={require('../assets/kakao_login_button.png')}
            style={styles.kakaoBtn}
          />
        </Pressable>

        <Pressable onPress={localLogin} style={styles.localBtn}>
          <Text style={styles.localBtnTxt}>로컬 로그인</Text>
        </Pressable>
      </View>
    </View>
  );
}
// ref.current.offsetWidth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00dbc5',
    justifyContent: 'space-between',
  },
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },

  loginButtons: {
    alignItems: 'center',
    marginBottom: 40,
  },
  kakaoBtn: {
    width: Dimensions.get('window').width / 2,
  },
  localBtn: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 5,
    marginTop: 10,
  },
  localBtnTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
export default StartPage;
