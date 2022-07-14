import React from 'react';
import { describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders learn react link', () => {
  // render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
