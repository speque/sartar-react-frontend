import React, { Component } from 'react'
import axios from 'axios'
import { Alert, ButtonGroup, Button, PageHeader } from 'react-bootstrap'
import Questions from './components/Questions'
import Results from './components/Results'
import './App.css'

const questionsQuery = 
`{
  questions {
    title
    query
    description
    notes
    disabled_by
    input {
      title
      meaning
    }
    options {
      title
      rune
      disabled_by
      explanation
    }
  }
}`

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      answers: [],
      results: null,
      error: null
    }

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.submitAnswers = this.submitAnswers.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
    this.getMaskedAnswers = this.getMaskedAnswers.bind(this)
    this.randomizeAnswers = this.randomizeAnswers.bind(this)
  }

  async componentDidMount() {
    await this.fetchQuestions()
  }

  async fetchQuestions() {
    return axios.post('http://localhost:3001/graphql', {query: questionsQuery})
      .then((response) => {
        this.setState({
          questions: response.data.data.questions,
          answers: Array(response.data.data.questions.length).fill(-1),
          error: null
        })
      })
      .catch((error) => {
        this.setState({
          error: "Fetching questions failed"
        })
        console.error(error)
      })
      .then(() => {
        // always executed
      });
  }

  async submitAnswers() {
    return axios.post('http://localhost:3001/', {
      answers: this.getMaskedAnswers()
    }).then((response) => {
      this.setState({
        results: response.data,
        error: null
      })
    }).catch((error) => {
      this.setState({
        error: "Posting answers failed"
      })
      console.error(error)
    })
  }

  setAnswer(questionIndex, answer) {
    this.setState({
      answers: Object.assign([...this.state.answers], { [questionIndex]: answer })
    })
  }

  getMaskedAnswers() {
    return this.state.answers.map((a, i) => {
      const question = this.state.questions[i]
      return question.disabled_by &&
      this.state.answers[question.disabled_by[0]] === question.disabled_by[1] ? -1 : a
    })
  }

  randomizeAnswers() {
    this.setState({
      answers: this.state.questions.map(q => Math.floor(Math.random() * Math.floor(q.options.length)))
    })
  }

  render() {
    return (
      <div className="App">

        <PageHeader>
          Sartar: Kingdom of Heroes <small>Clan questionnaire</small>
        </PageHeader>

        <Questions
          questions={this.state.questions}
          answers={this.state.answers}
          setAnswer={this.setAnswer} />

        {
          this.state.error &&
          <Alert bsStyle="warning">
            {this.state.error}
          </Alert>
        }

        <ButtonGroup>
          <Button
            disabled={this.state.answers.some((a, i) => {
              const question = this.state.questions[i]
              return (a < 0 &&
                !(
                  question.disabled_by &&
                  this.state.answers[question.disabled_by[0]] === question.disabled_by[1]
                )) ||
                (
                  a >= 0 && 
                  question.options[a].disabled_by && 
                  this.state.answers[question.options[a].disabled_by[0]] === question.options[a].disabled_by[1]
                )
            }
            )}
            onClick={this.submitAnswers}
            type="submit">Submit</Button>

          <Button
            onClick={this.randomizeAnswers}>
            Randomize
          </Button>
        </ButtonGroup>

        <Results
          results={this.state.results}>
        </Results>

      </div>
    )
  }
}

export default App
