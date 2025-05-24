import { storeAction } from "../../interfaces/common.interface";
import { USER_DETAIL } from "../../utils/types.utils";

const initialState = {
  user: "",
};

const UserReducer = (state = initialState, action: storeAction) => {
  switch (action.type) {
    case USER_DETAIL:
      return {...state, user: action.payload};
    default:
      return state;
  }
}

export default UserReducer
