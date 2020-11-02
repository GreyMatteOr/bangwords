import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import  { Lobby }  from '../src/Lobby/Lobby.js';
import History from './History.js';
import './App.css';

import ioc from 'socket.io-client';

let client;

export class App extends Component{
  constructor() {
    super()
    this.state = {
      attempts: [],
      display: [],
      inGame: false,
      isGameReady: false,
      isGenerator: null,
      isLoading: true,
      isOver: false,
      hasGenerator: null,
      userName: 'guest',
      rooms: [],
      numOnline: 'calculating the number of'
    }
  }

  componentDidMount = () => {
    // client = ioc.connect( "https://bangwords-api.herokuapp.com/");
    client = ioc.connect( "localhost:3001");

    client.on( 'result', (state) => {
      console.log(state)
      this.setState(state);
    });
  }

  createRoom = ( id ) => {
    client.emit('createRoom', id)
  }

  joinRoom = ( id ) => {
    client.emit('joinRoom', id)
  }

  setRole = (role) => {
    client.emit('setRole', role, this.state.userName);
    this.setState({isGenerator: role});
  }

  sendWordToGuess = (word) => {
    client.emit('setWord', word);
  }

  setUserName = (userName) => {
    this.setState({ userName })
  }

  makeGuess = (newGuess) => {
    client.emit('makeGuess', newGuess)
  }

  resetGame = () => {
    client.emit('clear')
  }

  setHistory() {
    if (!this.state.inGame && History[History.length -1] !== '/lobby') {
      window.setTimeout(() => History.push('/lobby'), 1);
    }

    else if (this.state.isGameReady && History[History.length -1] !== '/gamepage') {
      window.setTimeout(() => History.push('/gamepage'), 1);
    }

    else if ( this.state.isGenerator !== null && History[History.length -1] !== '/word-selector' ) {
      window.setTimeout(() => History.push('/word-selector'), 1);
    }

    else if ( History[History.length -1] !== '/bangwords' ) {
      window.setTimeout(() => History.push('/bangwords'), 1);
    }
  }

  render() {
    console.log(this.state)
    if (this.state.isLoading) {
      return (<h3>Loading...</h3>);
    }
    this.setHistory()
    return (
      <div className="BangWords">
        <header className="BangWords-header">
          {/* <h1 id='bangHeader'><em>BangWords</em></h1> */}
          <h1 id='bangHeader'>BangWords</h1>
          <h3>Logged in as: {this.state.userName}!</h3>
          <h4>{this.state.numOnline} players online right now</h4>
          <button id='theButton' onClick={this.resetGame}><em>Reset Game</em></button>
        </header>

        <Route
          exact path='/bangwords'
          render={() => {
            return (
              <Homepage
                designateRole={this.setRole}
                hasGenerator={this.state.hasGenerator}
            // addGenerator={this.addGenerator}
            // generatorExists={this.state.generatorExists}
              />
            )
          }}
        />

        <Route
          exact path='/gamepage'
          render={() => {
            return (
              <Gamepage
                makeGuess={this.makeGuess}
                attempts={this.state.attempts}
                display={this.state.display}
                isGenerator={this.state.isGenerator}
                playerNames={this.state.playerNames}
              />
            )
          }}
        />

        <Route
          exact path='/lobby'
          render={() => {
            return (
              <Lobby
                createRoom={this.createRoom}
                joinRoom={this.joinRoom}
                rooms={this.state.rooms}
                setUserName={this.setUserName}
              />
            )
          }}
        />

        <Route
          exact path='/word-selector'
          render={() => {
            return (
              <WordSelector
                makeWordToGuess={this.sendWordToGuess}
                isGenerator={this.state.isGenerator}
              />
            )
          }}
        />

      </div>
    );
  }
}

export default App;
