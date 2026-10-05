import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../components/Home';
import store from '../redux/configureStore';

describe('Tests for the Home component', () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>,
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByText('STATS BY COUNTRY')).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeVisible();
    expect(screen.getAllByRole('heading').length).toBe(15);
    expect(screen.getAllByRole('heading')[0]).toBeVisible();
  });
  test('Check for the snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});
