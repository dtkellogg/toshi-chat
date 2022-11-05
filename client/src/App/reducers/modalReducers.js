import {
  MODAL_ISOPEN_REQUEST,
  MODAL_ISOPEN_SUCCESS,
  MODAL_ISOPEN_FAIL,
  TOGGLE_THEME_REQUEST,
  TOGGLE_THEME_SUCCESS,
  TOGGLE_THEME_FAIL,
} from "../constants/modalConstants";

export function themeReducer(state = {darkMode: true}, action) {
  switch (action.type) {
    case TOGGLE_THEME_REQUEST:
      return { loading: true, ...state };

    case TOGGLE_THEME_SUCCESS:
      return { loading: false, darkMode: action.payload };

    case TOGGLE_THEME_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export function modalIsOpenReducer(state = {isOpen: false}, action) {
  switch (action.type) {
    case MODAL_ISOPEN_REQUEST:
      return { loading: true, ...state };

    case MODAL_ISOPEN_SUCCESS:
      return { loading: false, isOpen: action.payload };

    case MODAL_ISOPEN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}