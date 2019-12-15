import React from 'react'
import { PageHeader } from 'react-bootstrap'
import { Router, Link } from '@reach/router'
import Questionnaire from './components/Questionnaire'
import './App.css'

const Home = () => (
  <div>
    <p>Welcome to Sartar: Kingdom of Heroes clan questionnaire!</p>
    <p>
      <Link to={'questionnaire'}>To the questionnaire</Link>
    </p>
  </div>
)

const NotFound = () => (
  <div>
    <p>Sorry, nothing here.</p>
    <p>
      <Link to={'/'}>Home</Link>
    </p>
  </div>
)

const App = () => (
  <div className="App">
    <PageHeader>
      Sartar: Kingdom of Heroes <small>Clan questionnaire</small>
    </PageHeader>

    <Router>
      <Home path="/" />
      <Questionnaire path="questionnaire" />
      <NotFound default />
    </Router>
  </div>
)

export default App
