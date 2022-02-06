import { USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_RESET, USER_CREATE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/userConstants"


export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] }
    case USER_LIST_SUCCESS:
      return {loading: false, success: true, users: action.payload}
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true }
    case USER_CREATE_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_CREATE_RESET:
      return {}
    default:
      return state
  }
}