import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Pagination
} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Rune from './Rune'

class Questions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeQuestion: 0
    }

    this.setActiveQuestion = this.setActiveQuestion.bind(this)
    this.incrementActiveQuestion = this.incrementActiveQuestion.bind(this)
    this.decrementActiveQuestion = this.decrementActiveQuestion.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  setActiveQuestion(newActiveQuestion) {
    this.setState({
      activeQuestion: newActiveQuestion
    })
  }

  incrementActiveQuestion(e) {
    if (this.state.activeQuestion < this.props.questions.length - 1) {
      this.setActiveQuestion(this.state.activeQuestion + 1)
    }
  }

  decrementActiveQuestion(e) {
    if (this.state.activeQuestion > 0) {
      this.setActiveQuestion(this.state.activeQuestion - 1)
    }
  }

  handleKeyPress(e) {
    if (e.key === 'ArrowLeft') {
      this.decrementActiveQuestion()
    }
    if (e.key === 'ArrowRight') {
      this.incrementActiveQuestion()
    }
  }

  render() {
    if (!this.props.questions || this.props.questions.length <= 0) {
      return null
    } else {
      const activeQuestionIndex = this.state.activeQuestion
      const activeQuestion = this.props.questions[activeQuestionIndex]
      return (
        <div className="App-questions">
          {activeQuestion && (
            <div className="question">
              {activeQuestion.disabled_by &&
              this.props.answers[activeQuestion.disabled_by[0]] ===
                activeQuestion.disabled_by[1] ? (
                <h3>Previous answer rendered this question irrelevant</h3>
              ) : (
                <div className="question">
                  <h3>{activeQuestion.title}</h3>
                  {activeQuestion.description && (
                    <ReactMarkdown>{activeQuestion.description}</ReactMarkdown>
                  )}
                  {activeQuestion.query && <h4>{activeQuestion.query}</h4>}
                  <Form>
                    {activeQuestion.options.map((option, j) => {
                      const isDisabled =
                        option.disabled_by &&
                        this.props.answers[option.disabled_by[0]] ===
                          option.disabled_by[1]
                      const checked =
                        this.props.answers[activeQuestionIndex] === j
                      return (
                        <React.Fragment key={`option-${j}`}>
                          {option.explanation && (
                            <ReactMarkdown>{option.explanation}</ReactMarkdown>
                          )}
                          <Form.Check
                            type="radio"
                            className={isDisabled && checked && 'erroneous'}
                          >
                            <Form.Check.Input
                              className="optionInput"
                              id={`option-${activeQuestionIndex}-${j}`}
                              type={'radio'}
                              name={`options-${activeQuestionIndex}`}
                              checked={checked}
                              onChange={() =>
                                this.props.setAnswer(activeQuestionIndex, j)
                              }
                              disabled={isDisabled}
                            />
                            <Form.Check.Label
                              className="optionLabel"
                              htmlFor={`option-${activeQuestionIndex}-${j}`}
                            >
                              <ReactMarkdown
                                disallowedTypes={[
                                  'list',
                                  'listItem',
                                  'paragraph'
                                ]}
                                unwrapDisallowed={true}
                              >
                                {`${j + 1}. ${option.title}`}
                              </ReactMarkdown>
                              {option.rune && <Rune rune={option.rune} />}
                            </Form.Check.Label>
                          </Form.Check>
                        </React.Fragment>
                      )
                    })}
                    {activeQuestion.input &&
                      this.props.answers[activeQuestionIndex] !== -1 && (
                        <FormGroup>
                          <FormLabel>{activeQuestion.input.title}</FormLabel>
                          <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder=""
                            onChange={e =>
                              this.props.setInput(
                                activeQuestionIndex,
                                activeQuestion.input.meaning,
                                e.target.value
                              )
                            }
                          />
                        </FormGroup>
                      )}
                  </Form>
                  {activeQuestion.notes && (
                    <ReactMarkdown>{activeQuestion.notes}</ReactMarkdown>
                  )}
                </div>
              )}
            </div>
          )}

          <Pagination className="pagination">
            <Pagination.First onClick={() => this.setActiveQuestion(0)} />
            <Pagination.Prev
              disabled={this.state.activeQuestion <= 0}
              onClick={this.decrementActiveQuestion}
            >
              &lsaquo; Previous
            </Pagination.Prev>
            <Pagination.Next
              disabled={
                this.state.activeQuestion >= this.props.questions.length - 1
              }
              onClick={this.incrementActiveQuestion}
            >
              Next &rsaquo;
            </Pagination.Next>
            <Pagination.Last
              onClick={() =>
                this.setActiveQuestion(this.props.questions.length - 1)
              }
            />
          </Pagination>
        </div>
      )
    }
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      query: PropTypes.string,
      notes: PropTypes.string,
      disabled_by: PropTypes.arrayOf(PropTypes.number),
      input: PropTypes.exact({
        title: PropTypes.string.isRequired,
        meaning: PropTypes.string.isRequired
      }),
      options: PropTypes.arrayOf(
        PropTypes.exact({
          title: PropTypes.string.isRequired,
          rune: PropTypes.string,
          disabled_by: PropTypes.arrayOf(PropTypes.number),
          explanation: PropTypes.string
        })
      )
    })
  ).isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  setAnswer: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired
}

export default Questions
