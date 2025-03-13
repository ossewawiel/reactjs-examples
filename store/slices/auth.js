import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    details: {},
    sessionParams: {},
    currencyParams: {},
    busterParams: {},
  },
  reducers: {
    setCredentials: (state, action) => {
      // console.log(`login payload: ${JSON.stringify(action.payload)}`);
      // console.log(`login prestate: ${JSON.stringify(state)}`);
      state.user = action.payload.username;
      state.token = action.payload.accessToken;
      state.isLoggedIn = true;
      // console.log(`login state: ${JSON.stringify(state)}`);
    },
    removeCredentials: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      // console.log(`login state: ${JSON.stringify(state)}`);
    },
    setDetails: (state, action) => {
      // console.log(`details payload: ${JSON.stringify(action.payload)}`);
      // console.log(`details prestate: ${JSON.stringify(state)}`);
      state.details = action.payload;
      console.log(`details state: ${JSON.stringify(state)}`);
    },
    setSessionParams: (state, action) => {
      // console.log(`details payload: ${JSON.stringify(action.payload)}`);
      // console.log(`details prestate: ${JSON.stringify(state)}`);
      state.sessionParams = action.payload;
      console.log(`details state: ${JSON.stringify(state)}`);
    },
    setCurrencyParams: (state, action) => {
      // console.log(`details payload: ${JSON.stringify(action.payload)}`);
      // console.log(`details prestate: ${JSON.stringify(state)}`);
      state.currencyParams = action.payload;
      console.log(`details state: ${JSON.stringify(state)}`);
    },
    setBusterParams: (state, action) => {
      // console.log(`details payload: ${JSON.stringify(action.payload)}`);
      // console.log(`details prestate: ${JSON.stringify(state)}`);
      state.busterParams = action.payload;
      console.log(`details state: ${JSON.stringify(state)}`);
    },
  },
});

export const {
  setCredentials,
  removeCredentials,
  setDetails,
  setSessionParams,
  setCurrencyParams,
  setBusterParams,
} = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
