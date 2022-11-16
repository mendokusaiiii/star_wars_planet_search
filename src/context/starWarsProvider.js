import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

const NUMBER = {
  column: '',
  comparison: '',
  value: '',
};

const NAME = { name: '' };

const OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
const ORDER = {
  column: '',
  sort: '',
};

const populationASC = (a, b) => {
  const A = a.name.toLowerCase();
  const B = b.name.toLowerCase();
  const NEGATIVE = -1;
  const POSITIVE = 1;
  if (A < B) return NEGATIVE;
  if (A > B) return POSITIVE;
  return 0;
};

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [nameFiltered, setNameFiltered] = useState(NAME);
  const [numberFiltered, setNumberFiltered] = useState(NUMBER);
  const [columnOption, setColumnOption] = useState(OPTIONS);
  const [order, setOrder] = useState(ORDER);

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then(({ results }) => {
        results.map((planet) => delete planet.residents);
        setData(results);
        setDataFilter(results);
        setLoading(false);
      });
  }, []);

  const dataFiltered = (datas, array) => array.reduce((acc, curr) => {
    const filteredAcc = acc.filter((planet) => {
      if (curr.comparison === 'maior que') {
        return Number(planet[curr.column]) > Number(curr.value);
      } if (curr.comparison === 'menor que') {
        return Number(planet[curr.column]) < Number(curr.value);
      }
      return Number(planet[curr.column]) === Number(curr.value);
    });
    return filteredAcc;
  }, datas);

  useEffect(() => {
    const planetsFiltereds = data
      .filter(({ name }) => name.toLowerCase().includes(nameFiltered.name.toLowerCase()))
      .sort(populationASC);
    setDataFilter(planetsFiltereds);
  }, [nameFiltered, data, setDataFilter]);

  const handleFilter = (object, setFilterColumn) => {
    const accFilters = [...filters, object];
    const planetsFiltereds = dataFiltered(dataFilter, accFilters);
    const columnFilters = accFilters.reduce((acc, curr) => {
      const filteredAcc = acc.filter((option) => option !== curr.column);
      return filteredAcc;
    }, columnOption);

    setNumberFiltered(object);
    setColumnOption(columnFilters);
    setFilters(accFilters);
    setDataFilter(planetsFiltereds);
    setFilterColumn(columnFilters[0]);
  };

  const handleRemove = (element) => {
    const filtersChange = filters.filter((filter) => filter !== element);
    setFilters(filtersChange);
    setColumnOption([...columnOption, element.column]);

    const allData = data
      .filter(({ name }) => name.toLowerCase().includes(nameFiltered.name.toLowerCase()))
      .sort(populationASC);
    const updateDataFilter = dataFiltered(allData, filtersChange);
    setDataFilter(updateDataFilter);
  };

  const handleRemoveAllFilters = () => {
    setFilters([]);
    setColumnOption(OPTIONS);

    const allData = data
      .filter(({ name }) => name.toLowerCase().includes(nameFiltered.name.toLowerCase()))
      .sort(populationASC);
    const updateDataFilter = dataFiltered(allData, []);
    setDataFilter(updateDataFilter);
  };

  const unknownData = (column) => [...dataFilter].reduce((acc, curr) => {
    if (curr[column] === 'unknown') {
      acc.classArray.push(curr);
      return acc;
    }
    acc.sortedNumber.push(curr);
    return acc;
  }, {
    sortedNumber: [],
    classArray: [],
  });

  const orderData = (classArray, sortedNumber, { column, sort }) => {
    switch (sort) {
    case 'ASC':
      return [
        ...classArray,
        ...sortedNumber.sort((a, b) => a[column] - b[column]),
      ];
    default:
      return [
        ...sortedNumber.sort((a, b) => b[column] - a[column]),
        ...classArray,
      ];
    }
  };

  const handleSort = (object) => {
    setOrder(object);
    const { column } = object;
    const { classArray, sortedNumber } = unknownData(column);
    const sortedArrayData = orderData(classArray, sortedNumber, object);
    setDataFilter(sortedArrayData);
  };

  const value = useMemo(() => ({
    columnOption,
    dataFilter,
    nameFiltered,
    numberFiltered,
    filters,
    loading,
    order,
    handleFilter,
    handleRemove,
    handleRemoveAllFilters,
    handleSort,
    setNameFiltered,
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
