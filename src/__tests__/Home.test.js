import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import store from '../redux/configureStore';

describe('Tests for the Home component', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByText('STATS BY COUNTRY')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});