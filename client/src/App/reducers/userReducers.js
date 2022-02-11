import { USERS_ADD_FAIL, USERS_ADD_REQUEST, USERS_ADD_RESET, USERS_ADD_SUCCESS, USERS_DELETE_FAIL, USERS_DELETE_REQUEST, USERS_DELETE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../constants/userConstants"


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

export const addToUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_ADD_REQUEST:
      return { loading: true }
    case USERS_ADD_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USERS_ADD_FAIL:
      return { loading: false, error: action.payload }
    case USERS_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const deleteFromUsersReducer = (state = { }, action) => {
  switch (action.type) {
    case USERS_DELETE_REQUEST:
      return { loading: true }
    case USERS_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USERS_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}