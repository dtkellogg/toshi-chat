import { MODAL_ISOPEN_REQUEST, MODAL_ISOPEN_SUCCESS, MODAL_ISOPEN_FAIL, TOGGLE_THEME_REQUEST, TOGGLE_THEME_SUCCESS, TOGGLE_THEME_FAIL } from "../constants/modalConstants";

export const modalToggleOpen = (e) => async (dispatch, getState) => {
  try {
    dispatch({ type: MODAL_ISOPEN_REQUEST });

    dispatch({
      type: MODAL_ISOPEN_SUCCESS,
      payload: e,
    });
  } catch (error) {
    dispatch({
      type: MODAL_ISOPEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleTheme = (e) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOGGLE_THEME_REQUEST });

    dispatch({
      type: TOGGLE_THEME_SUCCESS,
      payload: e,
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_THEME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};