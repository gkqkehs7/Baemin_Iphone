import {combineReducers} from 'redux';

import storeSlice from '../slices/store';

const rootReducer = combineReducers({
  store: storeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
