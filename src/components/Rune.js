import React from 'react'
import runes from '../runes'

const Rune = ({rune}) => (
  <span className="runes">{runes[rune]}</span>
)

export default Rune
