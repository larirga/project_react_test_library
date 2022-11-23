import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });
    test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(typePokemon).toHaveTextContent(/electric/i);
    });
    test('O peso médio do Pokémon deve ser exibido com um texto no formato', () => {
      renderWithRouter(<App />);
      const weigthPokemon = screen.getByText(/average weight: 6\.0 kg/i);
      expect(weigthPokemon).toBeInTheDocument();
    });
    test('A imagem do Pokémon deve ser exibida', () => {
      renderWithRouter(<App />);
      const imagePokemon = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(imagePokemon).toBeInTheDocument();
      expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails.href).toBe('http://localhost/pokemon/25');
  });
  test('Teste se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const favoritePokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoritePokemon);
    expect(favoritePokemon).toBeChecked();

    const starFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(starFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
