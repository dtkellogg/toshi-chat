// Redux
import { 
  createStore, 
  combineReducers, 
  applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import { userListReducer, userCreateReducer } from './reducers/userReducers';
import { socketsReducer } from './reducers/socketReducers';


// const reducer = combineReducers({
//   // formData: formReducer,
//   // messageCreate: messageCreateReducer,
//   // projectList: projectListReducer,
//   // projectDetails: projectDetailsReducer,
//   // modalSetProject: modalSetProjectReducer,
//   // modalIsOpen: modalIsOpenReducer
// })

// const nameFromStorage = localStorage.getItem('name')
//   ? localStorage.getItem("name")
//   : ""
// const emailFromStorage = localStorage.getItem('email')
//   ? localStorage.getItem("email")
//   : ""
// const subjectFromStorage = localStorage.getItem('subject')
//   ? localStorage.getItem("subject")
//   : ""
// const messageFromStorage = localStorage.getItem('message')
//   ? localStorage.getItem("message")
//   : ""
// const readyToSubmitFromStorage = localStorage.getItem('readyToSubmit')
//   ? localStorage.getItem("readyToSubmit")
//   : ""

// const initialState = {
//   formData: {
//     name: nameFromStorage,
//     email: emailFromStorage,
//     subject: subjectFromStorage,
//     message: messageFromStorage,
//     readyToSubmit: readyToSubmitFromStorage,
//     submitted: false,
//   }
// };

const reducer = combineReducers({
  userList: userListReducer,
  userCreate: userListReducer,
  sockets: socketsReducer
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