import React, { useContext, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

function NumericFilter() {
  const {
    handleFilter,
    columnOption,
    handleRemoveAllFilters,
  } = useContext(starWarsContext);

  const [filterColumn, setColumn] = useState('population');
  const [filterComparison, setComparasion] = useState('maior que');
  const [number, setFilterNumber] = useState(0);

  const displayOptions = () => (columnOption.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      { option }
    </option>
  )));

  return (
    <form>
      {columnOption.length >= 1 ? (
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            value={ filterColumn }
            name="column"
            id="column"
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            { displayOptions() }
          </select>
        </label>
      ) : (
        <div>Maximum Filters Reached</div>
      )}

      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          value={ filterComparison }
          name="comparison"
          id="comparison"
          onChange={ ({ target: { value } }) => setComparasion(value) }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          type="number"
          data-testid="value-filter"
          value={ number }
          id="value"
          placeholder="Number"
          onChange={ ({ target: { value } }) => setFilterNumber(value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        disabled={ columnOption.length === 0 }
        onClick={ () => {
          handleFilter({
            column: filterColumn,
            comparison: filterComparison,
            value: number,
          }, setColumn);
        } }
      >
        Filter
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remove All Filters
      </button>
    </form>
  );
}

export default NumericFilter;
