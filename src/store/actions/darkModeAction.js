import { DARK_MODE } from "../types";

export const handledarkMode = (e) => async (dispatch) => {
  localStorage.setItem("darkmode", e);

  dispatch({
    type: DARK_MODE,
    payload: e,
  });
};