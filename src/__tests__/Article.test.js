import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Article from '../components/Article';

describe('Tests for the Article component', () => {
  render(
    <Router>
      <Article />
    </Router>,
  );
  test('Check for the following test on screen', () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeVisible();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeVisible();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeVisible();
  });
  test('Check for the snapshot', () => {
    expect(screen.debug()).toMatchSnapshot();
  });
});
