import './App.scss';
import { Form } from '../Form/Form';
import { useState } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Download } from '../Download/Download';

function App() {
  const [hash] = useState(window.location.hash.slice(1));
  
  return (
    <div className="App">
      <Navigation />
      <div className="Container">
        { hash ? <Download hash={hash} /> : <Form /> }
      </div>
    </div>
  );
}

export default App;
