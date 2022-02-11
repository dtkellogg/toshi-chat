import axios from 'axios';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USERS_ADD_FAIL,
  USERS_ADD_SUCCESS,
  USERS_ADD_REQUEST,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USERS_DELETE_FAIL,
} from "../constants/userConstants";


export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const { data } = await axios.get("/api/users")

    console.log('LIST USERS')
    console.log(data)
    
    dispatch({ 
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: 
        error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message
    })
  }
}

export const addToUsers = ( socket, user ) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_ADD_REQUEST,
    })

  console.log(`socket: ${socket}, user: ${user}`);

    // socket = JSON.stringify(socket)


    const { data } = await axios.post(`/api/users`, { socket, user })

    dispatch({
      type: USERS_ADD_SUCCESS,
      payload: data,
    })
    dispatch({ 
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USERS_ADD_FAIL,
      payload: message,
    })
  }
}

export const removeFromUsers = ( socket ) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_DELETE_REQUEST,
    })
    
    console.log("USERS ACTION- REMOVE");
    console.log(`socket: ${socket}`);

    await axios.delete(`/api/users/${socket}`)

    dispatch({
      type: USERS_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USERS_DELETE_FAIL,
      payload: message,
    })
  }
}