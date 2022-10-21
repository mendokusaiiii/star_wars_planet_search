import React from 'react';
import Provider from './context/starWarsProvider';
import './App.css';
// começando
function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
    </Provider>
  );
}

export default App;
