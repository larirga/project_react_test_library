import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    test('O primeiro link deve possuir o texto Home', () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeInTheDocument();
      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    test('O segundo link deve possuir o texto About', () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });
      expect(about).toBeInTheDocument();
      userEvent.click(about);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    test('O terceiro link deve possuir o texto Favorite Pokémon.', () => {
      const { history } = renderWithRouter(<App />);
      const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
      expect(favorite).toBeInTheDocument();
      userEvent.click(favorite);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/notfound'));
    const { pathname } = history.location;
    expect(pathname).toBe('/notfound');
    const errorMessage = screen.getByRole('heading', { name: /page requested not found/i });
    expect(errorMessage).toBeInTheDocument();
  });
});
