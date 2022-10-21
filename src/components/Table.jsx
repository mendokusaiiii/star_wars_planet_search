import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { data, filters } = useContext(starWarsContext);
  return (
    <div>
      <h1>STAR WARSR PLANETS!</h1>
      <table>
        <thead>
          <tr>
            {filters.map((element) => (
              <th key={ element }>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { data.map((planet) => (
            <tr key={ planet.name }>
              { Object.values(planet).map((id) => (
                <td key={ id }>
                  { id }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
