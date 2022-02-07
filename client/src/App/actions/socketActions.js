import { SOCKETS_ADD_USER, SOCKETS_REMOVE_USER } from '../constants/socketConstants'


export const addToSockets = (socket, name) => (dispatch, getState) => {
  //   console.log(`
  //   addToSockets
  //   type: ${SOCKETS_ADD_USER}
  //   socket: ${socket}
  //   name: ${name}
  // `);

  dispatch({
    type: SOCKETS_ADD_USER,
    payload: {
      socket: socket,
      name: name
    },
  })

  localStorage.setItem('sockets', JSON.stringify(getState().sockets))
}

export const removeFromSockets = (socket) => (dispatch, getState) => {
  dispatch({
    type: SOCKETS_REMOVE_USER,
    payload: socket,
  })

  // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}