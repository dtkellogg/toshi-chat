import {
  MODAL_ISOPEN_REQUEST,
  MODAL_ISOPEN_SUCCESS,
  MODAL_ISOPEN_FAIL,
  MODAL_SETPROJECT_REQUEST,
  MODAL_SETPROJECT_SUCCESS,
  MODAL_SETPROJECT_FAIL,
  MODAL_SETPROJECT_RESET,
} from "../constants/modalConstants";

export function modalSetProjectReducer(state = {project: {}}, action) {
  switch (action.type) {
    case MODAL_SETPROJECT_REQUEST:
      return { loading: true, ...state };

    case MODAL_SETPROJECT_SUCCESS:
      return { loading: false, project: action.payload };

    case MODAL_SETPROJECT_FAIL:
      return { loading: false, error: action.payload };

    case MODAL_SETPROJECT_RESET:
      return { project: {} };

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