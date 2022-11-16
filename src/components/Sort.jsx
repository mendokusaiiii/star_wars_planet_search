import React, { useContext, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

const OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Sort() {
  const { handleSort } = useContext(starWarsContext);
  const [byColumn, setByColumn] = useState('population');
  const [byRadio, setByRadio] = useState('ASC');

  const sortByOrder = () => (OPTIONS.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      { option }
    </option>
  )));
  return (
    <form>
      <label htmlFor="column">
        <select
          data-testid="column-sort"
          value={ byColumn }
          name="column"
          id="column"
          onChange={ ({ target: { value } }) => setByColumn(value) }
        >
          { sortByOrder() }
        </select>
      </label>
      <label
        htmlFor="asc"
      >
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="asc"
          name="column-sort-input"
          onChange={ ({ target: { value } }) => setByRadio(value) }
        />
        ASC
      </label>
      <label
        htmlFor="desc"
      >
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="desc"
          name="column-sort-input"
          onChange={ ({ target: { value } }) => setByRadio(value) }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort({
          column: byColumn,
          sort: byRadio,
        }) }
      >
        Sort Planets
      </button>
    </form>
  );
}

export default Sort;
