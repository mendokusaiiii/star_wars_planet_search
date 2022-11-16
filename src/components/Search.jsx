import React from 'react';
import Filter from './Filter';
import NumericFilter from './NumericFIlter';

function Search() {
  return (
    <div>
      <Filter />
      <div>
        <NumericFilter />
      </div>
    </div>
  );
}

export default Search;
