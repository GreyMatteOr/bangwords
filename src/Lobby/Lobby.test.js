import '@testing-library/jest-dom';
import { Lobby } from './Lobby.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('Lobby', () => {

  let mockFn = jest.fn();

  it('should render the default layout', () => {

    render(<Lobby designateRole={mockFn}/>);

    expect(screen.getByText('Generator')).toBeInTheDocument();
    expect(screen.getByText('Guesser')).toBeInTheDocument();
  })
})
