import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import App from './App';

jest.mock('@loadable/component', () => ({
  __esModule: true,
  default: () => () => null,
}));

const LocationDisplay = () => {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}</output>;
};

test('keeps the home route accessible without authentication', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <App />
      <LocationDisplay />
    </MemoryRouter>
  );
  expect(screen.getByTestId('current-path')).toHaveTextContent('/home');
});
