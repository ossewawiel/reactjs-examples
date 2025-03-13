// third-party
import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';

import { persistStore } from 'redux-persist';

// project imports
import rootReducer from './reducer';
import { rtkQueryErrorLogger } from './middleware';
import { baseApi } from './api/baseApi';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
      .concat(baseApi.middleware)
      .concat(rtkQueryErrorLogger),
});

// .concat(rtkQueryErrorLogger)

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
