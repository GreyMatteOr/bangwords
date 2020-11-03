import '@testing-library/jest-dom';
import { App } from './App.js';
import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";
import userEvent from  '@testing-library/user-event';
import { Socket } from 'socket.io-client';
// import mockserver from 'mockserver-node';
// jest.mock('socket.ioa-client');




describe('App', () => {
  
  let mockHistory = createMemoryHistory();
  
  it('should load a `Lobby` by default', () => {
    
      mockHistory.push('/lobby');
      render(
        <Router history={mockHistory}>
        <App />
      </Router>
    );
    
    // remove unnecessary vars
    let banger = screen.getByText('BangWords');
    let guest = screen.getByText('Logged in as: guest!');
    // let plea = screen.getByText('Please select a user name');
    // let availableRooms = screen.getByText('Available Rooms');
    // let defaultRooms = screen.getByText('Seems like there are no open rooms. Use the form below to open one!');
    let lobby = screen.getByTestId('lobby');
    expect(banger).toBeInTheDocument();
    expect(guest).toBeInTheDocument();
    // expect(plea).toBeInTheDocument();
    // expect(availableRooms).toBeInTheDocument();
    // expect(defaultRooms).toBeInTheDocument();
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
    
    // let opponent = screen.getByText('Your opponent is thinking of a word...');
    // let banger = screen.getByText('BangWords');
    // let guest = screen.getByText('Logged in as: guest!');
    let wordGuesser = screen.getByTestId('word-guesser');
    
    // expect(opponent).toBeInTheDocument();
    // expect(banger).toBeInTheDocument();
    // expect(guest).toBeInTheDocument();
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
    // let attempts = screen.getByText('Attempts');
    // let remainingGuesses = screen.getByText('Remaining Guesses: 0');
    
    expect(gamepage).toBeInTheDocument();
    // expect(attempts).toBeInTheDocument();
    // expect(remainingGuesses).toBeInTheDocument();
    
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
        <App/>
      </Router>
    );
    
    // let roleChooser = screen.getByText('Choose a role');
    // let genRole = screen.getByText('Generator');
    // let guessRole = screen.getByText('Guesser');
    let homepage = screen.queryByTestId('homepage');
    
    // expect(roleChooser).toBeInTheDocument();
    // expect(genRole).toBeInTheDocument();
    // expect(guessRole).toBeInTheDocument();
    expect(homepage).toBeInTheDocument();
    
    // sad paths
    let gamepage = screen.queryByTestId('game-page');
    let wordSelector = screen.queryByTestId('word-selector');
    expect(gamepage).toEqual(null);
    expect(wordSelector).toEqual(null);
  })
  
  it('should render the lobby if you\'re not in a room', () => {
    // change boolean from inGame to inRoom
    
    // mockHistory.push('lobby');
    
    render(
      <Router history={mockHistory}>
        <App inGame={false}/>
      </Router>
    );

      setTimeout(() => {
        let lobby = screen.queryByTestId('lobby');
        expect(lobby).toBeInTheDocument();
      }, 2)
    
    
  })
  
  it('should render the role selecting page after player enters a room', () => {
    
    // mockHistory.push('lobby');
    
    render(
      <Router history={mockHistory}>
        <App inGame={true} />
      </Router>
    );

      setTimeout(() => {
        let rolePage = screen.queryByTestId('homepage');
        expect(rolePage).toBeInTheDocument();
      }, 2)
    
    
  })
  // throw in another test to text for generator button disable 
  
  it('should render the gamepage after a game is ready', () => {
    
    // mockHistory.push('lobby');
    
    render(
      <Router history={mockHistory}>
        <App inGame={true} isGameReady={true}/>
      </Router>
    );

      setTimeout(() => {
        let gamepage = screen.queryByTestId('game-page');
        expect(gamepage).toBeInTheDocument();
      }, 2)
  })
  
  it('should render a separate layout for the generator', () => {
    
    // mockHistory.push('lobby');
    
    render(
      <Router history={mockHistory}>
        <App inGame={true} isGenerator={true}/>
      </Router>
    );

      setTimeout(() => {
        let isGen = screen.queryByTestId('word-generator');
        expect(isGen).toBeInTheDocument();
      }, 2)
  })
  
  it('should render the guess-input field if a game is ready, and the player is the guesser', () => {
    
    // mockHistory.push('lobby');
    
    render(
      <Router history={mockHistory}>
        <App inGame={true} isGameReady={true} isGenerator={false}/>
      </Router>
    );

      setTimeout(() => {
        let guessInput = screen.queryByText('Letter or Word');
        let guessButton = screen.queryByText('Guess');
        expect(guessInput).toBeInTheDocument();
        expect(guessButton).toBeInTheDocument();
      }, 2)
  })
})

// mock functions next
