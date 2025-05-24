import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import rootReducer from './reducers/root.reducer';
import { thunk } from 'redux-thunk'; 

const middleware: any[] = [thunk];

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
