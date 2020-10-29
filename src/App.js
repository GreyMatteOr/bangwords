import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import apiCalls from '../src/APICalls/APICalls'
import History from './History.js';
import './App.css';

export class App extends Component{
  constructor() {
    super()
    this.state = {
      id: 0,
      isGenerator: null,
      numPlayers: 0,
      word: '',
      // guess: '',
      remainingGuesses: 0,
      attempts: ['cuts', 'butts', 'coconuts'],
      // hints: [],
      isOver: false,
      display: [],
      ready: false
      // display: ['d', '_', '_', 'o', '_', 'a', 'u', 'r']
    }
  }

  designateRole = async (role) => {
    try {
      const joinGame = await apiCalls.joinGame(role)
      console.log("joinGame", joinGame)
      // dont need numPlayers, instead need boolean "ready"
      // the below line will get cleaned so we can just setState({joinGame})
      this.setState( joinGame )
    } catch(error) {
      console.log('error', error)
    }
    // console.log('role', role)
  }

  makeWordToGuess = async (createdWord) => {
    try {
      const data = await apiCalls.createWord(createdWord, this.state.id)
      data.word = createdWord;
      this.setState( data )
    } catch(error) {
      console.log("error2", error)
    }
  }

  makeGuess = async (newGuess) => {
    try {
      const data = await apiCalls.makeGuess(newGuess, this.state.id)
      console.log( data )
      this.setState( data )
    } catch(error) {
      console.log("error3", error)
    }
  }

  resetGame = async () => {
    try {
      const reset = await apiCalls.clearGame();
      this.setState( reset )
    } catch (error) {
      console.log(error)
    }
  }

  check = async() => {
    try {
      const checkGame = await apiCalls.checkStatus();
      console.log(checkGame)
      this.setState( checkGame )
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log("this.state", this.state)
    if (this.state.numPlayers > 1 && !this.state.ready && History[History.length -1] !== '/word-selector') {
      window.setTimeout(() => History.push('/word-selector'), 1);
    } else if (this.state.ready && History[History.length -1] !== '/gamepage') {
      
      window.setTimeout(() => History.push('/gamepage'), 1);
    } else if (History[History.length -1] !== '/') {
      window.setTimeout(() => History.push('/'), 1);
    }
    return (
      <div className="BangWords">
        <header className="BangWords-header">
          <h1>BangWords</h1>
          <button onClick={this.resetGame}>Reset Game</button>
          <button onClick={this.check}>Check Status</button>
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
            return  <Gamepage makeGuess={this.makeGuess} attempts={this.state.attempts} display={this.state.display}  isGenerator={this.state.isGenerator}/>
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
