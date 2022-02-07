import { SOCKETS_ADD_USER, SOCKETS_REMOVE_USER, SOCKETS_RESET } from '../constants/socketConstants'


export const socketsReducer = (state = { sockets: [] }, action) => {
  switch (action.type) {
    case SOCKETS_ADD_USER:
      const user = action.payload 

      // console.log(`
      //   USER: ${user}
      // `);
      // console.log(user);

      // console.log("...state.sockets:");
      // console.log(state.sockets);

      return {
        ...state,
        sockets: [...state.sockets, user]}
    case SOCKETS_REMOVE_USER:
      return {
        ...state,
        sockets: delete state.sockets.action.payload
      }
    case SOCKETS_RESET:
      return { sockets: [] }
    default:
      return {
        ...state
      }
  }
}