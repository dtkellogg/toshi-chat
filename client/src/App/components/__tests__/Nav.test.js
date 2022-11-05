import Nav from "../Nav"
import io from 'socket.io-client'
import { Provider } from 'react-redux'
import * as redux from 'react-redux'


const useSelectorSpy = jest.spyOn(redux, 'useSelector')
useSelectorSpy.mockReturnValue({ loading: false, error: null, users: ['user1', 'user2'] })

const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
useDispatchSpy.mockReturnValue(jest.fn())


// jest.mock('socket.io-client', () => {
//   const socket = {
//     emit: jest.fn(),
//   };
//   return jest.fn(() => socket);
// });

const mockedSocketEmit = jest.fn();
jest.mock('socket.io-client', () => ({
   ...jest.requireActual('socket.io-client'),
  socket: () => {
    emit: () => mockedSocketEmit
  }
}));
mockedSocketEmit.mockReturnValue(jest.fn())

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


test('handle click on settings button', () => {
  const nav = mount(<Provider store={store}><Nav name="test" socket="a" /></Provider>)

  // console.log(nav.debug())
  nav.find('.icon__settings').at(0).simulate('click')
  expect(useDispatchSpy.mock.calls.length).toEqual(1)
})

// test('handle click on back button', () => {
//   const ENDPOINT = 'http://localhost:5000';
//   const mockSocket = io.connect(ENDPOINT);
//   const nav = mount(<Provider store={store}><Nav name="test" socket={mockSocket} /></Provider>)

//   // console.log(nav.debug())
//   console.log(mockSocket.emit);

//   nav.find('.icon__back').at(0).simulate('click')
//   expect(mockSocket.emit).toHaveBeenCalledWith('user-left', {name: "test"})
// })