import React from 'react'
import { shallow } from 'enzyme'
import axios from 'axios'
import App from './App'

jest.mock('axios')

const emptyQuestionsResponse = { data: { data: { questions: [] } } }

it('renders without crashing', () => {
  axios.post.mockImplementation(() => Promise.resolve(emptyQuestionsResponse))
  shallow(<App />)
})

it('renders page header', () => {
  axios.post.mockImplementation(() => Promise.resolve(emptyQuestionsResponse))
  const wrapper = shallow(<App />)
  expect(
    wrapper.contains(
      <h1>
        Sartar: Kingdom of Heroes <small>Clan questionnaire</small>
      </h1>
    )
  ).toEqual(true)
})
