import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
  });

  const mapSrc = data[0].foundAt.map((element) => element.map);

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    const cardLinkDetails = screen.queryByRole('link', { name: /more details/i });
    expect(cardLinkDetails).not.toBeInTheDocument();

    const detailsName = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(detailsName).toBeInTheDocument();

    const summaryDetails = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryDetails).toBeInTheDocument();

    const paragraphDetails = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(paragraphDetails).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    const headingMap = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(headingMap).toBeInTheDocument();
    const locationPokemon = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(locationPokemon).toHaveLength(2);

    const nameLocation = screen.getByText(/kanto power plant/i);
    expect(nameLocation).toBeInTheDocument();
    locationPokemon.forEach((image, index) => {
      expect(image.src).toBe(mapSrc[index]);
      expect(image.alt).toBe('Pikachu location');
    });
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const checkFavDetails = screen.getByText(/pokémon favoritado\?/i);
    expect(checkFavDetails).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
