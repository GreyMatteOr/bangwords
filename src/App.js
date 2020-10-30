import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import History from './History.js';
import './App.css';

import ioc from 'socket.io-client';

let client;

export class App extends Component{
  constructor() {
    super()
    this.state = {
      isGenerator: null,
      attempts: [],
      isOver: false,
      display: [],
      isLoading: true,
      isGameReady: false
    }
  }

  componentDidMount = () => {
    client = ioc.connect( "http://localhost:" + 3001 );

    client.on( 'gameJoined', (state) => {
      this.setState(state);
    });

    client.on( 'newWordToGuess', (state) => {
      this.setState(state);
    });

    client.on( 'result', (state) => {
      this.setState(state);
    });


    this.setState({isLoading: false});
  }

  joinGame = (role) => {
    client.emit('joinGame', role);
    this.setState({isGenerator: role});
  }

  sendWordToGuess = (word) => {
    client.emit('setWord', word);
  }

  makeGuess = (newGuess) => {
    client.emit('makeGuess', newGuess)
  }

  resetGame = () => {
    client.emit('clear')
  }

  setHistory() {
    if (this.state.isGameReady && History[History.length -1] !== '/gamepage') {
      window.setTimeout(() => History.push('/gamepage'), 1);
    }

    else if ( this.state.isGenerator !== null && History[History.length -1] !== '/word-selector' ) {
      window.setTimeout(() => History.push('/word-selector'), 1);
    }

    else if ( History[History.length -1] !== '/' ) {
      window.setTimeout(() => History.push('/'), 1);
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
          <h1 id='bangHeader'><em>BangWords</em></h1>
          <button id='theButton' onClick={this.resetGame}>Reset Game</button>
        </header>
        <Switch>
          <Route
            exact path='/'
            render={() => {
            return  <Homepage designateRole={this.joinGame}/>
            }}
          />
          <Route
            exact path='/word-selector'
            render={() => {
            return  <WordSelector makeWordToGuess={this.sendWordToGuess} isGenerator={this.state.isGenerator}/>
            }}
          />
          <Route
            exact path='/gamepage'
            render={() => {
            return  <Gamepage makeGuess={this.makeGuess} attempts={this.state.guesses} display={this.state.display}  isGenerator={this.state.isGenerator}/>
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
