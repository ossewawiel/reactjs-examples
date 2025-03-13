// action - state management
import {
  LOGIN,
  LOGOUT,
  SET_CURRENCY,
  SET_DETAILS,
  SET_BUSTER,
} from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  user: null,
  token: null,
  isInitialized: false,
  isLoggedIn: false,
  details: {},
  sessionParams: {},
  currencyParams: {},
  busterParams: {},
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { user, token, details } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
        token,
        details,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        token: null,
        details: {},
      };
    }
    case SET_DETAILS: {
      return {
        ...state,
        details: action.payload,
      };
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currencyParams: action.payload,
      };
    }
    case SET_BUSTER: {
      return {
        ...state,
        busterParams: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
