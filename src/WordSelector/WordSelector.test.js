import '@testing-library/jest-dom';
import { WordSelector } from './WordSelector.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('WordSelector', () => {

  it('should render the default layout', () => {

    render(<WordSelector />);

    expect(screen.getByText('Type a word for your opponent to guess!')).toBeInTheDocument();
  })
})
