import React from 'react';
import Provider from './context/starWarsProvider';
import './App.css';
import Table from './components/Table';
import Search from './components/Search';

function App() {
  return (
    <Provider>
      <Search />
      <Table />
    </Provider>
  );
}

export default App;
