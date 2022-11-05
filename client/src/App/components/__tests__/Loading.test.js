import Loading from '../Loading'


describe('tests for Loading Component', () => {
  test('renders loading text', () => {
    const wrapper = mount(<Loading />);
    expect(wrapper.text()).toMatch(/Loading.../)
  });
  
  test('matches snapshot', () => {
   const wrapper = shallow(<Loading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
})