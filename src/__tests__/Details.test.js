import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store   from '../redux/configureStore';
import Details from '../components/Details';

describe('Tests for the Details component', () => {
  render(
    <Provider store={store}>
      <Details />
    </Provider>
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});