import {
  isFulfilled,
  isPending,
  isRejected,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { useDispatch } from './index';
import { openSnackbar } from './slices/snackbar';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  const TOAST_QUERY_ID = 'query-status';
  if (isFulfilled(action)) {
    // console.warn(`Success Payload: ${JSON.stringify(action.payload)}`);
    // if (action.meta.arg.type === 'mutation') {
    //     toast.update(TOAST_QUERY_ID, {
    //         render: 'Done',
    //         type: toast.TYPE.INFO,
    //         isLoading: false,
    //         autoClose: 200
    //     });
    // } else {
    //     toast.update(TOAST_QUERY_ID, {
    //         isLoading: false,
    //         autoClose: 100
    //     });
    // }
  } else if (isRejected(action)) {
    console.warn(
      `Action: ${action.type} was rejected with error: ${JSON.stringify(action)}`,
    );
    console.warn(`Payload: ${JSON.stringify(action.payload)}`);
    let msg = 'Unknown error';
    if (action.payload?.error) {
      msg = action.payload.error;
    } else if (action.payload?.data?.apiexception) {
      msg = action.payload.data.apiexception.message;
    } else if (action.error) {
      msg = `Unable to communicate with web service: ${action.error.message}`;
    }
    // toast.update(TOAST_QUERY_ID, {
    //     render: msg,
    //     isLoading: false,
    //     type: toast.TYPE.ERROR,
    //     autoClose: false
    // });
  }

  return next(action);
};
