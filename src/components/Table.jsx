import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const {
    dataFilter, loading,
  } = useContext(starWarsContext);

  const linked = (links, string) => (links.map((link, index) => (
    <a href={ link } key={ `${string}-${index}` }>
      {`${link.split('/')[5]}º`}
    </a>
  )));

  const formated = (info) => {
    const date = info.split('.')[0].split('T');
    return `${date[0].replace('-', '/').replace('-', '/')} at ${date[1]}`;
  };

  return (
    <section>
      { loading && <h2>Loading...</h2> }
      { (!loading && dataFilter.length > 0) && (
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Rotation Period</th>
              <th scope="col">Orbital Period</th>
              <th scope="col">Diameter</th>
              <th scope="col">Climate</th>
              <th scope="col">Gravity</th>
              <th scope="col">Terrain</th>
              <th scope="col">Surface Water</th>
              <th scope="col">Population</th>
              <th scope="col">Films</th>
              <th scope="col">Created</th>
              <th scope="col">Edited</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ linked(planet.films, 'film') }</td>
                <td>{ formated(planet.created) }</td>
                <td>{ formated(planet.edited) }</td>
                <td><a href={ planet.url }>Link</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) }
      { (!loading && dataFilter.length === 0)
    && <h2>Invalid Search</h2>}
    </section>
  );
}

export default Table;
