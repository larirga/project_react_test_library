import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);
    const errorMessage = screen.getByText(/no favorite pokémon found/i);
    expect(errorMessage).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
    const dataPokemon = [data[0]];
    renderWithRouter(<FavoritePokemon
      pokemonList={ dataPokemon }
    />);

    const namePokemon = screen.getByText(/pikachu/i);
    const typePokemon = screen.getByText(/electric/i);
    const averagePokemon = screen.getByText(/average weight: 6\.0 kg/i);
    const imagePokemon = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(averagePokemon).toBeInTheDocument();
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
