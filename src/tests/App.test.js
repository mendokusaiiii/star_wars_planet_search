import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockedPlanets from './mockedPlanets';

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedPlanets),
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testando a aplicação do projeto StarWars Planets', () => {
  test('Testa se todos os elementos aparecem na tela', () => {
    render(<App />)
    const filteredNames = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btn = screen.getByTestId('button-filter');
    expect(filteredNames).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  test('Testa se todos os filtros estão funcionando corretamente', async () => {
    render(<App />)
    const filteredNames = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btn = screen.getByTestId('button-filter');
    userEvent.type(filteredNames, /Tatooine/i)
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '100')
    userEvent.click(btn);
    userEvent.type(filteredNames, /alderaan/i)
    userEvent.type(valueFilter, '2')
    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.click(btn);
    userEvent.type(filteredNames, /coruscant/i)
    userEvent.type(valueFilter, '100')
    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.click(btn);
    userEvent.type(filteredNames, /coruscant/i)
    userEvent.type(valueFilter, '80')
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(btn);
  })
  test('Testa se a API retorna todos os elementos da tabela', async () => {
    render(<App />);
    const name = await screen.findByRole('columnheader', {
      name: /name/i
    });
    const rotation = screen.getByRole('columnheader', {
      name: /rotation period/i
    });
    const orbital = screen.getByRole('columnheader', {
      name: /orbital period/i
    });
    const diameter = screen.getByRole('columnheader', {
      name: /diameter/i
    });
    const climate = screen.getByRole('columnheader', {
      name: /climate/i
    });
    const gravity = screen.getByRole('columnheader', {
      name: /gravity/i
    });
    const terrain = screen.getByRole('columnheader', {
      name: /terrain/i
    });
    const surface = screen.getByRole('columnheader', {
      name: /surface water/i
    });
    const population = screen.getByRole('columnheader', {
      name: /population/i
    });
    const films = screen.getByRole('columnheader', {
      name: /films/i
    });
    const created = screen.getByRole('columnheader', {
      name: /created/i
    });
    const edited = screen.getByRole('columnheader', {
      name: /edited/i
    });
    const url = screen.getByRole('columnheader', {
      name: /url/i
    });
    expect(name).toBeInTheDocument();
    expect(rotation).toBeInTheDocument();
    expect(orbital).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(surface).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(films).toBeInTheDocument();
    expect(created).toBeInTheDocument();
    expect(edited).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  })
  test('Testa se começa com os valores inicias corretos', async () => {
    render(<App />);
    const columns = await screen.findByTestId('column-filter');
    expect(columns).toHaveValue('population');
  })
  it('Testa se o botão de limpar os filtros funciona corretamente', async () => {
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
  
    waitFor(() => {
      const planets = screen.getAllByTestId('planet-name');
      expect(planets.length).toBe(10)
    })
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, 200000);
    userEvent.click(btnFilter);
    waitFor(() => {
      const planets = screen.getAllByTestId('planet-name');
      expect(planets.length).toBe(1)
    })
    const btnRemoveAll = screen.getByRole('button', {
      name: /remove all filter/i
    })
    expect(btnRemoveAll).toBeInTheDocument();
    userEvent.click(btnRemoveAll);
    waitFor(() => {
      const planets = screen.getAllByTestId('planet-name');
      expect(planets.length).toBe(10)
    })
  });
  test('Testa maior e menor que', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedPlanets),
    });
  
    render(<App />);
  
    const Alderaan = await screen.findByText(/Alderaan/i, {}, {timeout: 5000});
  
    expect(Alderaan).toBeInTheDocument();
  
    const btnFilter = screen.getByTestId('button-filter');
  
    expect(Alderaan).toBeInTheDocument()
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period')
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que')
    userEvent.type(screen.getByTestId('value-filter'), '350')
    userEvent.click(btnFilter);
  
    await waitFor(() => expect(Alderaan).not.toBeInTheDocument(), {timeout: 5000});
  
    const Dagobah = screen.queryByText(/Dagobah/i, {}, {timeout: 5000});
    expect(Dagobah).toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population')
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
    userEvent.type(screen.getByTestId('value-filter'), '0')
    userEvent.click(btnFilter);
  
    await waitFor(() => expect(Dagobah).not.toBeInTheDocument(), {timeout: 5000});
  
    // const Naboo = await screen.findByText(/Naboo/i, {}, {timeout: 5000});
    // expect(Naboo).toBeInTheDocument();
    // userEvent.selectOptions(screen.getByTestId('column-filter'), 'population')
    // userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a')
    // userEvent.type(screen.getByTestId('value-filter'), '2')
    // userEvent.click(btnFilter);
  
    // await waitFor(() => expect(Naboo).not.toBeInTheDocument(), {timeout: 5000});
  });
});