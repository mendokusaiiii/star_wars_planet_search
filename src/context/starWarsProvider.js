import React from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function starWarsProvider({ children }) {
  return (
    <starWarsContext.Provider value={ value }>
      {children}
    </starWarsContext.Provider>
  );
}

starWarsProvider.prototypes = {
  children: PropTypes.node,
}.isRequired;

export default starWarsProvider;
