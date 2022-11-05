import { act } from "react-dom/test-utils"

jest.mock("../actions/userActions", () => {
  return {
    listUsers: {
      __esModule: true,
      default: async () => {
        type: USER_LIST_SUCCESS,
        payload: data
      }
    }
  }
})

test('matches snapshot', async () => {
   const Chat = require("../Chat").default
   let wrapper

   await act(async () => {
     wrapper = mount(<Chat />)
   })

   wrapper.update()
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


//   jest.mock('./react-native', () => {
//   return {
//     NativeModules: {
//       MyCustomNativeModule: {
//         dismiss: jest.fn()
//       }
//     }
//   };
// });