import MsgInput from '../MsgInput'


describe('tests for MsgInput Component', () => {
  test('matches snapshot', () => {
   const wrapper = shallow(<MsgInput />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
})