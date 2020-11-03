import '@testing-library/jest-dom';
import { Lobby } from './Lobby.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('Lobby', () => {

  let mockFn = jest.fn();

  it('should render the default layout', () => {

    render(<Lobby rooms={['chris', 'ian', 'matt']} designateRole={mockFn}/>);

    expect(screen.getByText('chris')).toBeInTheDocument();
    expect(screen.getByText('ian')).toBeInTheDocument();
    expect(screen.getByText('matt')).toBeInTheDocument();
    expect(screen.getByText('Available Rooms')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Room ID')).toBeInTheDocument();
  })
})
