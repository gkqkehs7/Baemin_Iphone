import React, {useCallback, useEffect} from 'react';
import {Alert} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';

import {useAppDispatch} from './src/store';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';

import {IMenuData, IStoreData} from './src/types/db';
import userSlice from './src/slices/user';

import LandingPage from './src/pages/LandingPage';
import StartPage from './src/pages/StartPage';
import StorePage from './src/pages/StorePage';
import MenuDetailPage from './src/pages/MenuDetailPage';
import SignInPage from './src/pages/SignInPage';
import SignUpPage from './src/pages/SignUpPage';
import CartPage from './src/pages/CartPage';
import StoresPage from './src/pages/StoresPage';
import PayPage from './src/pages/PayPage';
import HistoryPage from './src/pages/Historypage';
import HistoryDetailPage from './src/pages/HistoryDetailPage';
import WriteReviewPage from './src/pages/WriteReviewPage';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  SignInPage: undefined;
  SignUpPage: undefined;
  StartPage: undefined;
};

export type LoggedInParamList = {
  LandingPage: undefined;
  CategoryPage: undefined;
  StorePage: {storeId: number};
  StoresPage: undefined;
  CartPage: undefined;
  MenuDetailPage: {
    menuData: IMenuData;
    storeData: IStoreData;
  };
  PayPage: {
    totalPrice: number;
  };
  HistoryPage: undefined;
  HistoryDetailPage: {
    historyId: number;
  };
  WriteReviewPage: {
    historyId: number;
    storeName: string;
    storeId: number;
    repMenuName: string;
    menuIds: string;
  };
};

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const dispatch = useAppDispatch();

  const LoggedOutUser = useCallback(() => {
    const LoggedOutUser2 = async () => {
      await EncryptedStorage.removeItem('refreshToken');
      dispatch(
        userSlice.actions.setUser({
          nickname: '',
          email: '',
          accessToken: '',
        }),
      );
    };
    LoggedOutUser2();
  }, [dispatch]);

  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;

        console.log(status);
        if (status === 403) {
          console.log(error.response.data.error);
          if (error.response.data.error === 'TokenExpiredError') {
            const originalRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            // token refresh 요청
            const {data} = await axios.post(
              `${Config.API_URL}/api/user/refreshToken`, // token refresh api
              {},
              {headers: {authorization: `${refreshToken}`}},
            );
            // 새로운 토큰 저장

            console.log(data);
            dispatch(userSlice.actions.setAccessToken(data.accessToken));
            await EncryptedStorage.setItem('refreshToken', data.refreshToken);

            originalRequest.headers.authorization = `${data.accessToken}`;
            // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
            return axios(originalRequest);
          }
        }
        if (status === 419) {
          if (error.response.data.error === 'TokenExpiredError') {
            LoggedOutUser();
            return Alert.alert('다시 로그인하세요');
          } else if (error.response.data.error === 'JsonWebTokenError') {
            LoggedOutUser();
            return Alert.alert('잘못된 로그인 정보입니다');
          } else if (error.response.data.error === 'noTokenError') {
            LoggedOutUser();
            return Alert.alert('잘못된 로그인 정보입니다2');
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch, LoggedOutUser]);

  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        console.log(token);
        if (!token) {
          // SplashScreen.hide();
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/api/user/refreshToken`,
          {},
          {
            headers: {
              authorization: `${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.name,
            email: response.data.email,
            accessToken: response.data.accessToken,
          }),
        );
      } catch (error) {
        console.error(error);
        if (
          (error as AxiosError).response?.data.error === 'TokenExpiredError'
        ) {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        // SplashScreen.hide();
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="StoresPage" component={StoresPage} />
          <Stack.Screen name="StorePage" component={StorePage} />
          <Stack.Screen name="MenuDetailPage" component={MenuDetailPage} />
          <Stack.Screen name="CartPage" component={CartPage} />
          <Stack.Screen name="PayPage" component={PayPage} />
          <Stack.Screen name="HistoryPage" component={HistoryPage} />
          <Stack.Screen
            name="HistoryDetailPage"
            component={HistoryDetailPage}
          />
          <Stack.Screen name="WriteReviewPage" component={WriteReviewPage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="SignInPage" component={SignInPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
        </Stack.Navigator>
      )}
    </>
  );
}
export default AppInner;
