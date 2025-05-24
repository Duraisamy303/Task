import store from '../store/store';
import {
  USER_DETAIL,
 
} from './types.utils';

// --------------------    Auth   --------------------

export const user_detail = (payload: object) =>
  store.dispatch({
    type:  USER_DETAIL ,
    payload: payload,
  });





