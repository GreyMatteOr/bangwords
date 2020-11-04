import '@testing-library/jest-dom';
import { App } from './App.js';
import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";
import userEvent from  '@testing-library/user-event';
import { Socket } from 'socket.io-client';
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
    
    let banger = screen.getByText('BangWords');
    let guest = screen.getByText('Logged in as: guest!');
    let lobby = screen.getByTestId('lobby');
    
    expect(banger).toBeInTheDocument();
    expect(guest).toBeInTheDocument();
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
    
    let wordGuesser = screen.getByTestId('word-guesser');
    
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
    
    expect(gamepage).toBeInTheDocument();
    
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
    
    let homepage = screen.queryByTestId('homepage');
    
    expect(homepage).toBeInTheDocument();
    
    // sad paths
    let gamepage = screen.queryByTestId('game-page');
    let wordSelector = screen.queryByTestId('word-selector');
    
    expect(gamepage).toEqual(null);
    expect(wordSelector).toEqual(null);
  })
  
  it('should render the lobby if you\'re not in a room', () => {
    // change boolean from inGame to inRoom
    
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
  
  it('should disable the generator button, if a generator has already been selected', () => {
    
    render(
      <Router history={mockHistory}>
        <App inGame={true} isGenerator={true}/>
      </Router>
    );
    
    setTimeout(() => {
      let genBtn = screen.queryByText('generator');
      expect(genBtn).toBeDisabled();
    }, 2) 
  })
  
  it('should render the gamepage after a game is ready', () => {
    
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
    
    let genSelect = jest.fn();
    render(
      <Router history={mockHistory}>
        <App inGame={true} isGenerator={true} mockRole={genSelect}/>
      </Router>
    );
    
    setTimeout(() => {
      let isGen = screen.queryByTestId('word-generator');
      expect(isGen).toBeInTheDocument();


      let genSelectBtn = screen.queryByTestId('generator-button');
      userEvent.click(genSelectBtn);
      expect(genSelect).toHaveBeenCalled();
    }, 2)
  })
  
  it('should render the guess-input field if a game is ready, and the player is the guesser', () => {
    let fakeAGuess = jest.fn();
    render(
      <Router history={mockHistory}>
        <App inGame={true} isGameReady={true} isGenerator={false} fakeAGuess={fakeAGuess}/>
      </Router>
    );
    
    setTimeout(() => {
      let guessInput = screen.queryByText('Letter or Word');
      let guessButton = screen.queryByTestId('word-submit-button');

      expect(guessInput).toBeInTheDocument();
      expect(guessButton).toBeInTheDocument();

      userEvent.click(guessButton);
      expect(fakeAGuess).toHaveBeenCalled();
    }, 2)
  })
  
  it('should update the lobby when inputs are given', () => {
    
    mockHistory.push('/lobby');
    render(
      <Router history={mockHistory}>
        <App userName={'Jeff Leopard'} rooms={['Big Cats', 'Hair Metal']}/>
      </Router>
    )
        
    let jeffyBoy = screen.queryByText('Logged in as: Jeff Leopard!');
    let jeffRoom1 = screen.queryByText('Big Cats');
    let jeffRoom2 = screen.queryByText('Hair Metal');
    
    expect(jeffyBoy).toBeInTheDocument();
    expect(jeffRoom1).toBeInTheDocument();
    expect(jeffRoom2).toBeInTheDocument();
  })
  
  it('should make sure all lobby buttons are clickable', () => {
    
    mockHistory.push('/lobby');
    // let forfeitGame = jest.fn();
    let mockSetName = jest.fn();
    let mockJoinRoom = jest.fn();
    let mockCreateRoom = jest.fn();

    render(
      <Router history={mockHistory}>
        <App 
          // resetMock={forfeitGame} 
          mockSetName={mockSetName} 
          mockJoinRoom={mockJoinRoom} 
          mockCreateRoom={mockCreateRoom}
          rooms={['Big Cats', 'Hair Metal']}
        />
      </Router>
    )

    let submitUserName = screen.queryByTestId('test-username-btn');
    userEvent.click(submitUserName);
    expect(mockSetName).toHaveBeenCalled();

    let createRoomBtn = screen.queryByTestId('create-room-btn');
    userEvent.click(createRoomBtn);
    expect(mockCreateRoom).toHaveBeenCalled();

    let joinRoomBtn = screen.queryByTestId('join-room-btn');
    userEvent.click(joinRoomBtn);
    expect(mockJoinRoom).toHaveBeenCalled();
    
    // let forfeitBtn = screen.queryByTestId('forfeit-test');
    // userEvent.click(forfeitBtn);
    // expect(forfeitGame).toHaveBeenCalled();
  })
})
