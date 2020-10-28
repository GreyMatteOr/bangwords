import '@testing-library/jest-dom';
import { Homepage } from './Homepage.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('Homepage', () => {

  it('should render the default layout', () => {

    render(<Homepage />);

    expect(screen.getByText('Generator')).toBeInTheDocument();
    expect(screen.getByText('Guesser')).toBeInTheDocument();
  })
})
