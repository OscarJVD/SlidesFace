import { postDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPES } from "./globalTypes";

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    const result = await postDataAPI("login", user);

    console.log(result);

    dispatch({
      type: GLOBAL_TYPES.LOGIN_USER,
      payload: { token: result.data.access_token, user: result.data.user },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { success: result.data.msg },
    });

    // console.log(result);
    // console.log(user);
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    const result = await postDataAPI("register", user);

    // console.log(result);

    dispatch({
      type: GLOBAL_TYPES.LOGIN_USER,
      payload: { token: result.data.access_token, user: result.data.user },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { success: result.data.msg },
    });

    window.location.reload()
    // console.log(result);
    // console.log(user);
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");

  if (firstLogin) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    try {
      const result = await postDataAPI("refreshTkn");

      dispatch({
        type: GLOBAL_TYPES.LOGIN_USER,
        payload: { token: result.data.access_token, user: result.data.user },
      });

      dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
    } catch (error) {
      // console.log(error.response.data.msg);

      // console.log(window.location)
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: { error: error.response.data.msg },
        });
      }else{
        dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {  },
        });
      }
    }
  }
};
