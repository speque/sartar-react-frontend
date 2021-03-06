import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Rune from './Rune'

class Results extends Component {
  render() {
    const results = this.props.results
    return (
      results && (
        <Container className="results">
          <Row>
            <Col xs={4} md={4}>
              <h4>Runes</h4>
              <div className="runes-results">
                {results.rune_modifiers &&
                  Object.entries(results.rune_modifiers).map(([k, v]) => (
                    <p key={`rune-modifier-${k}`}>
                      <span>
                        {k} <Rune rune={k} /> <Badge>{v}</Badge>
                      </span>
                    </p>
                  ))}
              </div>
            </Col>
            <Col xs={4} md={4}>
              <h4>Resources</h4>
              <div className="resource-results">
                {results.resource_modifiers &&
                  Object.entries(results.resource_modifiers).map(([k, v]) => (
                    <p key={`resource-modifier-${k}`}>
                      <span>
                        {k} <Badge>{v}</Badge>
                      </span>
                    </p>
                  ))}
              </div>
            </Col>
            <Col xs={4} md={4}>
              <h4>Virtues</h4>
              <div className="virtue-results">
                {results.virtue_modifiers &&
                  Object.entries(results.virtue_modifiers).map(([k, v]) => (
                    <p key={`virtue-modifier-${k}`}>
                      <span>
                        {k} <Badge>{v}</Badge>
                      </span>
                    </p>
                  ))}
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={3}>
              <h4>Ancient enemy</h4>
              <p>
                {results.ancient_enemy ? (
                  <ReactMarkdown>{results.ancient_enemy}</ReactMarkdown>
                ) : (
                  'None'
                )}
              </p>
            </Col>
            <Col xs={3}>
              <h4>New enemy</h4>
              <p>{results.new_enemy || 'None'}</p>
            </Col>
            <Col xs={3}>
              <h4>Wyter abilities</h4>
              {results.wyter_abilities &&
                results.wyter_abilities.map((ability, i) => (
                  <p key={`ability-${i}`}>{ability}</p>
                ))}
            </Col>
            <Col xs={3}>
              <h4>Special effects</h4>
              <div className="specials-results">
                {results.specials &&
                  results.specials.map((s, i) => (
                    <ReactMarkdown key={`special-${i}`}>{s}</ReactMarkdown>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      )
    )
  }
}

Results.propTypes = {
  results: PropTypes.exact({
    rune_modifiers: PropTypes.object,
    resource_modifiers: PropTypes.object,
    virtue_modifiers: PropTypes.object,
    specials: PropTypes.arrayOf(PropTypes.string),
    ancient_enemy: PropTypes.string,
    new_enemy: PropTypes.string,
    wyter_abilities: PropTypes.arrayOf(PropTypes.string)
  })
}

export default Results
