import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Banner from './components/banner/Banner'
import Container from './components/container/Container'
import './index.scss'

ReactDOM.render(
  <>
    <Banner />
    <Container>
      <App />
    </Container>
  </>,
  document.querySelector('#root'))