import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function Filter() {
  const { allFilters: { filteredNames }, setFilteredNames } = useContext(starWarsContext);
  return (
    <label htmlFor="filters">
      <input
        type="text"
        id="filters"
        data-testid="name-filter"
        value={ filteredNames }
        onChange={ (event) => setFilteredNames(event.target.value) }
      />
    </label>
  );
}

export default Filter;
