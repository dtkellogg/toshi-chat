import axios from 'axios';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_CREATE_REQUEST,
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

export const createUser = ( user ) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/users`, { user }, config)

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USER_CREATE_FAIL,
      payload: message,
    })
  }
}