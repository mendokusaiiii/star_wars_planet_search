import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

const URL = 'https://swapi.dev/api/planets';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredNames, setFilteredNames] = useState('');
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(URL);
        const dataAPI = await response.json();
        const { results } = dataAPI;
        results.map((planet) => delete planet.residents);
        setData(results);
        setFilters(Object.keys(results[0]));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAPI();
  }, []);

  const value = useMemo(() => ({
    data,
    filters,
    allFilters: {
      filteredNames,
    },
    setFilteredNames,
  }));

  return (
    <starWarsContext.Provider value={ value }>
      { children }
    </starWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
