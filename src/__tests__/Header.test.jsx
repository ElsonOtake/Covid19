import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';

describe('Tests for the Header component', () => {
  render(
    <Router>
      <Header />
    </Router>,
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByText(/America/)).toBeInTheDocument();
    expect(screen.getByText('Covid19 in South America')).toBeInTheDocument();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeVisible();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeVisible();
  });
  test('Check for the snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});
