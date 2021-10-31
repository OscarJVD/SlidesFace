import { postDataAPI } from "../../utils/fetchData";

export const TYPES = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  AUTH: "AUTH",
  NOTIFY: "NOTIFY",
};

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const result = await postDataAPI("login", user);

    dispatch({
      type: "AUTH",
      payload: { token: result.data.access_token, user: result.data.user },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({ type: "NOTIFY", payload: { success: result.data.msg } });

    console.log(result);
    console.log(user);
  } catch (error) {
    dispatch({ type: "NOTIFY", payload: { error: error.msg } });
    console.log(error);
  }
};
