import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Banner from './banner/Banner';
import Container from './container/Container';

ReactDOM.render(
  <Container>
    <Banner />
    <App />,
  </Container>,
  document.querySelector('#root'));