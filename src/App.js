import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import apiCalls from '../src/APICalls/APICalls'
import './App.css';

export class App extends Component{
  constructor() {
    super()
    this.state = {
      isGenerator: null,
      word: '',
      guess: '',
      // attempts: [],
      attempts: ['cuts', 'butts', 'coconuts'],
      // hints: [],
      display: ['d', '_', '_', 'o', '_', 'a', 'u', 'r']
    }
  }
  designateRole = async (role) => {
    // const isGenerator = await apiCalls.joinGame(role)
    // this.setState({isGenerator})
    console.log('role', role)
  }
  makeWordToGuess = async (createdWord) => {
    // const word = await apiCalls.createWord(createdWord, 1)
    // this.setState({word})
    console.log("createdWord", createdWord)
  }
  makeGuess = async (newGuess) => {
    // const guess = await apiCalls.makeGuess(newGuess)
    // this.setState({guess})
    console.log('newGuess', newGuess)
  }
  render() {
    return (
      <div className="BangWords">
        <header className="BangWords-header">
          <h1>BangWords</h1>
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
            return  <WordSelector makeWordToGuess={this.makeWordToGuess}/>
            }}
          />
          <Route
            exact path='/gamepage'
            render={() => {
            return  <Gamepage makeGuess={this.makeGuess} attempts={this.state.attempts} display={this.state.display}/>
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
