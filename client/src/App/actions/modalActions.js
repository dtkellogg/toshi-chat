import { MODAL_ISOPEN_REQUEST, MODAL_ISOPEN_SUCCESS, MODAL_ISOPEN_FAIL, MODAL_SETPROJECT_REQUEST, MODAL_SETPROJECT_SUCCESS, MODAL_SETPROJECT_FAIL } from "../constants/modalConstants";

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

export const modalSetProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: MODAL_SETPROJECT_REQUEST });

    dispatch({
      type: MODAL_SETPROJECT_SUCCESS,
      payload: project
    })
  } catch (error) {
    dispatch({
      type: MODAL_SETPROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}