import '@testing-library/jest-dom';
import { Gamepage } from './Gamepage.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('Gamepage', () => {

  it('should render the default layout', () => {

    render(<Gamepage />);

    expect(screen.getByText('Letter:')).toBeInTheDocument();
    expect(screen.getByText('Word:')).toBeInTheDocument();
    expect(screen.getByTestId('word-submit-button')).toBeInTheDocument();
    expect(screen.getByText('Attempts')).toBeInTheDocument();
  })
})
