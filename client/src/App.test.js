import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders landing page hero heading', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /AI-Powered Travel Planner/i })).toBeInTheDocument();
});

test('renders navbar on plans page', () => {
  render(
    <MemoryRouter initialEntries={['/plans']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/WeGO/i)).toBeInTheDocument();
});
