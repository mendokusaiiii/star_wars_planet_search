import React, { useContext, useState, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Filter() {
  const { setNameFiltered } = useContext(starWarsContext);
  const [names, setNameFilter] = useState('');

  useEffect(() => {
    setNameFiltered({ name: names });
  }, [setNameFiltered, names]);
  return (
    <form>
      <label htmlFor="name-filter">
        <input
          type="text"
          data-testid="name-filter"
          value={ names }
          placeholder="Planet Name"
          onChange={ ({ target: { value } }) => setNameFilter(value) }
        />
      </label>
    </form>
  );
}

export default Filter;
