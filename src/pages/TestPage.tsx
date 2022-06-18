import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store/reducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import userSlice from '../slices/user';
import {ICartData} from '../types/slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';

const TestPage = () => {
  const cart = useSelector((state: RootState) => state.user.cart);

  useEffect(() => {
    sumTotalPrice();
  }, [dispatch, sumTotalPrice]);

  const renderItem = item => {
    return (
      <View>
        <Text>aa</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TestPage;
