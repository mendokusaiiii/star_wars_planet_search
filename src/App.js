import React from 'react';
import Provider from './context/starWarsProvider';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
