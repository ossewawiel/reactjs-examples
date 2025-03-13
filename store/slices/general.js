// third-party
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  databases: [],
  optimusVersion: {
    version: 0,
    release: 0,
    revision: 0,
  },
};

const slice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
