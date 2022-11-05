import { listUsers } from "../userActions"
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios'

jest.mock('axios')

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

jest.mock('./')

describe("mock API calls", () => {
  test("mocking the listUsers action creator", async () => {
    const dispatch = useDispatch()

    const mockedResponse = {data: ["user1", "user2"]}
    axios.get.mockResolvedValue(mockedResponse)
    // const app = require('../app.js')

    // act
    await dispatch(listUsers())

    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith("/api/users")
  })
})