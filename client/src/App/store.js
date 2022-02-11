// Redux
import { 
  createStore, 
  combineReducers, 
  applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import { userListReducer, addToUsersReducer, deleteFromUsersReducer } from './reducers/userReducers';
import { modalIsOpenReducer, themeReducer } from "./reducers/modalReducer";


const reducer = combineReducers({
  userList: userListReducer,
  addToUsers: addToUsersReducer,
  deleteFromUsers: deleteFromUsersReducer,
  modalIsOpen: modalIsOpenReducer,
  theme: themeReducer
})

const initialState = {
  userList: {
    users: []
  },
  sockets: {sockets: []},
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store