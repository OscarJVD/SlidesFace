import { TYPES } from "../actions/notifyAction";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.NOTIFY:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
