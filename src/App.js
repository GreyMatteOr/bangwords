import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import theCalls from '../src/APICalls/APICalls'
import './App.css';

export class App extends Component{
  constructor() {
    super()
    this.state = {
      isGuesser: null,
      word: '',
      guess: ''
    }
  }
  designateRole = async (role) => {
    const isGuesser = await theCalls.joinGame(role)
    this.setState({isGuesser})
  }
  makeWordToGuess = async (createdWord) => {
    const word = await theCalls.createWord(createdWord, 1)
    this.setState({word})
  }
  makeGuess = async (newGuess) => {
    const guess = await theCalls.makeGuess(newGuess)
    this.setState({guess})
  }
  render() {
    return (
      <div className="BangWords">
        <header className="BangWords-header">
          BangWords
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
            return  <Gamepage makeGuess={this.makeGuess}/>
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
