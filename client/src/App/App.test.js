import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
// import {}


describe('App.js renders without error', () => {
  it('Renders the outer main__container div', () => {
    const wrapper = shallow(<Router><App /></Router>);
    console.log(wrapper.firstChild);
    expect(wrapper.firstChild).toHaveClass("main__container")
  })
})