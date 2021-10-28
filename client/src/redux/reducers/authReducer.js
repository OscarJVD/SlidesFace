import { TYPES } from "../actions/authAction";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case TYPES.LOGOUT_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
