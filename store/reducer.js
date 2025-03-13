// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import { baseApi } from './api/baseApi';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  snackbar: snackbarReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'opt-',
    },
    snackbarReducer,
  ),
});

export default reducer;
