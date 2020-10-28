import '@testing-library/jest-dom';
import { WordSelector } from './WordSelector.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('WordSelector', () => {

  it('should render the default layout', () => {

    render(<WordSelector />);

    expect(screen.getByText('Your opponent is thinking of a word...')).toBeInTheDocument();
  })
})
