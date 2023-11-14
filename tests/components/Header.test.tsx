import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../../src/components/Header';

describe('Header Component', () => {
  test('Renders header correctly', () => {
    render(<Header />);
    const headerText = screen.getByText('Open Weather App');
    expect(headerText).toBeTruthy();
  });

  test('Header snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
