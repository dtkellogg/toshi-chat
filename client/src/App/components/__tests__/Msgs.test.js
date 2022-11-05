import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Msgs from '../Msgs'
import store from '../../store.js'


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000"
  })
}));

describe("<Msgs />", () => {
  it("Should render Msgs component", async () => {
    // document.getElementById = jest.fn().mockReturnValueOnce("msg-container");
    // window.scrollTop = jest.fn();



    const socketMock = jest.fn().mockReturnValue("type", "msg", "name")
    
    const wrapper = mount(<Provider store={store}><Router><Msgs name="currentUser" socket="1"/></Router></Provider>, { attachTo: document.getElementById("root") })
    // const wrapper = mount(<Provider store={store}><Router><Msgs /></Router></Provider>);

    
    // let objDiv = wrapper.document.getElementById("msg-container");


  });
});