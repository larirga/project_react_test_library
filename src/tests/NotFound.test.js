import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/notfound'));
  });

  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const errorMessage = screen.getByRole('heading', { name: /page requested not found/i });
    expect(errorMessage).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem', () => {
    const imageNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
