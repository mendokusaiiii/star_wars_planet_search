import React from 'react';
import Filter from './Filter';
import NumericFilter from './NumericFIlter';
import RemoveFilters from './RemoveFIlters';
import Sort from './Sort';

function Search() {
  return (
    <div>
      <Filter />
      <div>
        <NumericFilter />
      </div>
      <RemoveFilters />
      <Sort />
    </div>
  );
}

export default Search;
