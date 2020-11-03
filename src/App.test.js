import '@testing-library/jest-dom';
import { App } from './App.js';
import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";
import userEvent from  '@testing-library/user-event';
import { Socket } from 'socket.io-client';
// jest.mock('socket.io-client');




describe('App', () => {
  
  let mockHistory = createMemoryHistory();
  
  it('should load a `Lobby` by default', () => {
    
      mockHistory.push('/lobby');
    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );

    let banger = screen.getByText('BangWords');
    let guest = screen.getByText('Logged in as: guest!');
    let plea = screen.getByText('Please select a user name');
    let availableRooms = screen.getByText('Available Rooms');
    let defaultRooms = screen.getByText('Seems like there are no open rooms. Use the form below to open one!');
    let lobby = screen.getByTestId('lobby');
    expect(banger).toBeInTheDocument();
    expect(guest).toBeInTheDocument();
    expect(plea).toBeInTheDocument();
    expect(availableRooms).toBeInTheDocument();
    expect(defaultRooms).toBeInTheDocument();
    expect(lobby).toBeInTheDocument();
    

    // sad paths
    let wordSelector = screen.queryByTestId('word-selector');
    let gamepage = screen.queryByTestId('game-page');
    
    expect(wordSelector).toEqual(null);
    expect(gamepage).toEqual(null);
  })
  
  it('should load a `WordSelector` when the url is appropriate', () => {
    
    mockHistory.push('/word-selector');
    
    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );
    
    let opponent = screen.getByText('Your opponent is thinking of a word...');
    let banger = screen.getByText('BangWords');
    let guest = screen.getByText('Logged in as: guest!');
    let wordGuesser = screen.getByTestId('word-guesser');
    
    expect(opponent).toBeInTheDocument();
    expect(banger).toBeInTheDocument();
    expect(guest).toBeInTheDocument();
    expect(wordGuesser).toBeInTheDocument();
    

    // sad paths
    let homepage = screen.queryByTestId('homepage');
    let gamepage = screen.queryByTestId('game-page');
    
    expect(homepage).toEqual(null);
    expect(gamepage).toEqual(null);
    
  })
  
  it('should load a `Gamepage` when url is navigated to', () => {
    
    mockHistory.push('/gamepage');
    
    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );
    
    let gamepage = screen.queryByTestId('game-page');
    let attempts = screen.getByText('Attempts');
    let remainingGuesses = screen.getByText('Remaining Guesses: 0');
    
    expect(gamepage).toBeInTheDocument();
    expect(attempts).toBeInTheDocument();
    expect(remainingGuesses).toBeInTheDocument();
    
    
    // sad paths
    let homepage = screen.queryByTestId('homepage');
    let wordSelector = screen.queryByTestId('word-selector');
    
    expect(homepage).toEqual(null);
    expect(wordSelector).toEqual(null);
  })
  
  it('should load a role selecting page when url is navigated to', () => {
    
    mockHistory.push('/bangwords');
    
    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );

    // client.on.mockResolvedValueOnce({})
    
    
    screen.debug()
    let roleChooser = screen.getByText('Choose a role');
    let genRole = screen.getByText('Generator');
    let guessRole = screen.getByText('Guesser');
    let homepage = screen.queryByTestId('homepage');

    expect(roleChooser).toBeInTheDocument();
    expect(genRole).toBeInTheDocument();
    expect(guessRole).toBeInTheDocument();
    expect(homepage).toBeInTheDocument();

    // userEvent.click(genRole);
    // expect(genRole).toHaveBeenCalled();
    
    // sad paths
    let gamepage = screen.queryByTestId('game-page');
    let wordSelector = screen.queryByTestId('word-selector');
    expect(gamepage).toEqual(null);
    expect(wordSelector).toEqual(null);
  })
})
