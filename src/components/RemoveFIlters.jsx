import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function RemoveFilters() {
  const { filters, handleRemove } = useContext(starWarsContext);
  return (
    <ul>
      {filters.map((filter, index) => {
        const { column, comparison, value } = filter;
        const container = `${column} ${comparison} ${value}`;
        return (
          <li key={ index } data-testid="filter">
            <span>{ container }</span>
            <button
              type="button"
              onClick={ () => handleRemove(filter) }
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default RemoveFilters;
