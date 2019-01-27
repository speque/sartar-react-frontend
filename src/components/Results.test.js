import React from 'react'
import { shallow } from 'enzyme'
import { Badge } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Results from './Results'
import Rune from './Rune'

describe('Results', () => {

  it('renders without crashing', () => {
    shallow(<Results />)
  })

  const rune_modifiers = {air: 1}
  const resource_modifiers = {wealth: 2}
  const specials = ['Special ability']

  it('renders specials', () => {
    const results = {
      specials
    }
    const wrapper = shallow(<Results results={results} />)
    expect(wrapper
        .find('div.specials-results')
        .find(ReactMarkdown)
        .prop('children'))
      .toEqual('Special ability')
  })

  it('renders runes', () => {
    const results = {
      rune_modifiers
    }
    const wrapper = shallow(<Results results={results} />)
    const runeParagraph = <p><span>air <Rune rune={'air'} /> <Badge>{1}</Badge></span></p>
    expect(wrapper.find('div.runes-results').contains(runeParagraph)).toEqual(true)
  })

  it('renders resources', () => {
    const results = {
      resource_modifiers
    }
    const wrapper = shallow(<Results results={results} />)
    const runeParagraph = <p><span>wealth <Badge>{2}</Badge></span></p>
    expect(wrapper.contains(runeParagraph)).toEqual(true)
  })

})
