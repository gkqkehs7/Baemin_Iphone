import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import NaverMapView from 'react-native-nmap';

import Geocoder from 'react-native-geocoding';
import {useNavigation} from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MyLocation() {
  const navigation = useNavigation();
  Geocoder.init('AIzaSyBlBte6vh681D5ysSL48kOyR62IjSqLE3g', {language: 'kr'});

  const [markerColor, setMarkerColor] = useState('black');
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const markerMoving = useCallback(() => {
    setMarkerColor('red');
  }, []);

  const markerStop = useCallback(e => {
    setMarkerColor('black');
    Geocoder.from(e.latitude, e.longitude)
      .then(json => {
        var addressComponent = json.results[0];

        var street_name = addressComponent.address_components[1].long_name;
        var street_num = addressComponent.address_components[0].long_name;
        setAddress(street_name + ' ' + street_num);
      })
      .catch(error => console.warn(error));
  }, []);

  const toDetailLocation = useCallback(() => {
    console.log(address);
    navigation.navigate('DetailLocation', {address: address});
  }, [address]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setMyPosition({
          latitude: 37.454,
          longitude: 126.6604,
        });

        if (myPosition) {
          console.log(myPosition.latitude, myPosition.longitude);
        }
      },
      console.error,
      {
        enableHighAccuracy: true, //정확하게 가져오기
        timeout: 20000, //20초 안에 못가져오면 에러
      },
    );
  }, []);

  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  return (
    <View style={styes.Container}>
      <View style={styes.Top}>
        <Text style={styes.TopText}>지도에서 위치 확인</Text>
        <Pressable style={styes.back} onPress={goBack}>
          <Ionicons name="arrow-back" color={'black'} size={20} />
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <NaverMapView
          onCameraChange={markerStop}
          onTouch={markerMoving}
          style={{width: '100%', height: '100%'}}
          zoomControl={true}
          showsMyLocationButton={true}
          center={{
            zoom: 18,
            tilt: 0,
            latitude: 37.454,
            longitude: 126.6604,
          }}
        />

        <Pressable style={styes.mapMarker}>
          <FontAwesome5 name="map-marker-alt" size={33} color={markerColor} />
        </Pressable>
      </View>

      <View>
        <Text style={styes.currentLocation}>{address}</Text>

        <Pressable style={styes.change}>
          <FontAwesome name="exchange" color={'black'} />
          <Text style={styes.changeText}>지번으로 보기</Text>
        </Pressable>

        <Pressable style={styes.locationBtn} onPress={toDetailLocation}>
          <Text style={styes.locationBtnText}>이 위치로 주소 설정</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styes = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },

  Top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
    height: Dimensions.get('window').height / 13,
  },
  TopText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  back: {
    position: 'absolute',
    left: 12,
    bottom: 10,
    margin: 'auto',
    width: '50%',
  },

  mapMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },

  currentLocation: {
    marginTop: 20,
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },

  change: {
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  changeText: {
    color: 'black',
    marginLeft: 3,
    fontSize: 12,
  },

  locationBtn: {
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00dbc5',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  locationBtnText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
  },
});

export default MyLocation;
