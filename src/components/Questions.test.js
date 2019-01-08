import React from 'react'
import { shallow, mount } from 'enzyme'
import Questions from './Questions'
import { Radio } from 'react-bootstrap'

describe('Questions', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(
      <Questions
        questions={[]}
        setAnswer={jest.fn()}
        getAnswer={jest.fn()}
      />)
      expect(wrapper.html()).toEqual(null)
  })

  it('renders a question', () => {
    const question = {
      title: "Question title",
      description: "Question description",
      query: "Question query",
      options: [
        {
          title: "Option title",
          rune: "air"
        }
      ]
    }
    const wrapper = shallow(
      <Questions
        questions={[question]}
        setAnswer={jest.fn()}
        getAnswer={jest.fn()}
      />)
    //console.log(wrapper.debug())
    expect(wrapper.find('h3').first().text()).toEqual('Question title')
    expect(wrapper.find('p.description').first().text()).toEqual('Question description')
    expect(wrapper.find('h4').first().text()).toEqual('Question query')
    /*expect(wrapper.find('div.form-group').contains(
      <div class="radio"><label title=""><input name="radioGroup" type="radio" checked="" />1. Option title<span class="runes"> c</span></label></div>
    )).toEqual(true)*/
  })

})
