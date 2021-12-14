import { getDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPES } from "./globalTypes";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getUserProfileById =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

        const res = await getDataAPI(`/getUser/${id}`, auth.token);

        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (error) {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            error: error.response.data.msg
              ? error.response.data.msg
              : error.response,
          },
        });
      }
    }
  };
