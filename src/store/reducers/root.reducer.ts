import {combineReducers} from 'redux';
import UserReducer from './user.reducer';


const combinedReducer = combineReducers({
  user: UserReducer,

});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    return combinedReducer(action.type === 'RESET' ? undefined : state, action);
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
