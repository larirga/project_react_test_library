import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    test('O botão deve conter o texto Próximo Pokémon', () => {
      renderWithRouter(<App />);
      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(buttonNext).toBeInTheDocument();
    });
    test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
      renderWithRouter(<App />);
      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      userEvent.click(buttonNext);

      expect(screen.getByText(/charmander/i)).toBeInTheDocument();

      userEvent.click(buttonNext);

      expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);
    const idName = screen.getAllByTestId('pokemon-name');
    expect(idName).toHaveLength(1);
  });

  describe('Teste se a Pokédex tem os botões de filtro:', () => {
    test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
      renderWithRouter(<App />);
      const buttonId = screen.getAllByTestId('pokemon-type-button');
      expect(buttonId).toHaveLength(7);
    });
    test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
      renderWithRouter(<App />);
      const filterFire = screen.getByRole('button', { name: /fire/i });

      userEvent.click(filterFire);

      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
      const elementPokemon = screen.getByText(/rapidash/i);
      expect(elementPokemon).toBeInTheDocument();
    });
  });
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
