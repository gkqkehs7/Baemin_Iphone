import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

function usePermissions() {
  check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then(result => {
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
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
        return result;
      }

      return result;
      //   if (
      //     result === RESULTS.DENIED ||
      //     result === RESULTS.LIMITED ||
      //     result === RESULTS.GRANTED
      //   ) {
      //     console.log(result);
      //     return request(PERMISSIONS.IOS.CAMERA);
      //   } else {
      //     console.log(result);
      //     throw new Error('카메라 지원 안 함');
      //   }
    })
    .catch(console.error);
}

export default usePermissions;
