import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Banner from './components/banner/Banner'
import Container from './components/container/Container'
import { ToastContainer } from 'react-toastify'
import './index.scss'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <>
    <Banner />
    <Container>
      <App />
    </Container>
    <ToastContainer 
      position='top-center' 
      autoClose={2000} 
      hideProgressBar={true}
      closeOnClick={false}
      draggable={false}
      closeButton={false} />
  </>,
  document.querySelector('#root'))