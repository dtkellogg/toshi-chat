import UploadBtn from '../UploadBtn'


describe('tests for UploadBtn Component', () => {
  test('matches snapshot', () => {
   const wrapper = shallow(<UploadBtn />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
})