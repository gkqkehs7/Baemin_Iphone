import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {ICartData} from '../types/slice';

interface initialState {
  nickname: string;
  email: string;
  accessToken: string;
  cart: ICartData[];
}
const initialState: initialState = {
  nickname: '',
  email: '',
  accessToken: '',
  cart: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    menuToCart(state, action) {
      const diffrentStore = state.cart.find(
        v => v.StoreId !== action.payload.StoreId,
      );

      if (diffrentStore) {
        return Alert.alert(
          '장바구니에는 하나의 가게의 음식만 담을 수 있습니다.',
        );
      } else {
        const sameMenu = state.cart.find(
          v => v.menuId === action.payload.menuId,
        );

        if (sameMenu) {
          return Alert.alert('같은 메뉴는 담을 수 없습니다');
        }

        state.cart.push(action.payload);
      }
    },

    deleteFromCart(state, action) {
      console.log(action.payload.menuId);
      const index = state.cart.findIndex(
        v => v.menuId === action.payload.menuId,
      );
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteAllCart(state, action) {
      console.log('다 지워라');
      state.cart = [];
    },
  },
});

export default userSlice;
