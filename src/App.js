import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import apiCalls from '../src/APICalls/APICalls'
import History from './History.js';
import './App.css';

import ioc from 'socket.io-client';

export class App extends Component{
  constructor() {
    super()
    this.state = {
      id: 0,
      isGenerator: null,
      numPlayers: 0,
      word: '',
      // guess: '',
      guesses: [],
      // attempts: ['cuts', 'butts', 'coconuts'],
      // hints: [],
      isOver: false,
      display: [],
      isLoading: true
      // display: ['d', '_', '_', 'o', '_', 'a', 'u', 'r']
    }
    this.client;
  }

  componentDidMount() {
    this.client = ioc.connect( "http://localhost:" + 3001 );
    this.client.once( "connect", function () {
        console.log( 'Client: Connected to port ' + 3001 );
        this.client.emit( "echo", "Hello World", function ( message ) {
            console.log( 'Echo received: ', message );
        } );
    } );
    this.setState({isLoading: false});
  }


  designateRole = async (role) => {
    try {
      const joinGame = await apiCalls.joinGame(role)
      console.log(joinGame)
      // dont need numPlayers, instead need boolean "ready"
      // the below line will get cleaned so we can just setState({joinGame})
      this.setState({ isGenerator: joinGame.isGen, numPlayers: joinGame.numPlayers, id: joinGame.id })
    } catch(error) {
      console.log('error', error)
    }
    // console.log('role', role)
  }

  makeWordToGuess = async (createdWord) => {
    try {
      const word = await apiCalls.createWord(createdWord, this.state.id)
      this.setState({ word })
    } catch(error) {
      console.log("error2", error)
    }
  }

  makeGuess = async (newGuess) => {
    try {
      const guess = await apiCalls.createWord(newGuess, this.state.id)
      this.setState({ guess })
    } catch(error) {
      console.log("error3", error)
    }
  }

  resetGame = async () => {
    try {
      const reset = await apiCalls.clearGame();
      this.setState({ reset })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.state.isLoading) {
      return (<h3>Loading...</h3>);
    }
    if (this.state.numPlayers > 1 && !this.state.word && History[History.length -1] !== '/word-selector') {
      window.setTimeout(() => History.push('/word-selector'), 1);
    } else if (this.state.numPlayers > 1 && this.state.word && History[History.length -1] !== '/gamepage') {

      window.setTimeout(() => History.push('/gamepage'), 1);
    } else if (History[History.length -1] !== '/') {
      window.setTimeout(() => History.push('/'), 1);
    }
    return (
      <div className="BangWords">
        <header className="BangWords-header">
          <h1>BangWords</h1>
          <button onClick={this.resetGame}>Reset Game</button>
        </header>
        <Switch>
          <Route
            exact path='/'
            render={() => {
            return  <Homepage designateRole={this.designateRole}/>
            }}
          />
          <Route
            exact path='/word-selector'
            render={() => {
            return  <WordSelector makeWordToGuess={this.makeWordToGuess} isGenerator={this.state.isGenerator}/>
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
