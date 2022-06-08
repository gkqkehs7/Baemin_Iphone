import {combineReducers} from 'redux';

import storeSlice from '../slices/store';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  store: storeSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
