import React from 'react';
import Filter from './Filter';
import NumericFilter from './NumericFIlter';
import RemoveFilters from './RemoveFIlters';

function Search() {
  return (
    <div>
      <Filter />
      <div>
        <NumericFilter />
      </div>
      <RemoveFilters />
    </div>
  );
}

export default Search;
