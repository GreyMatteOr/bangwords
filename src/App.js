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
      isGuesser: null,
      word: '',
      guess: ''
    }
  }
  designateRole = async (role) => {
    // const isGuesser = await apiCalls.joinGame(role)
    // this.setState({isGuesser})
    console.log('designateRole')
  }
  makeWordToGuess = async (createdWord) => {
    // const word = await apiCalls.createWord(createdWord, 1)
    // this.setState({word})
    console.log("makeWordToGuess")
  }
  makeGuess = async (newGuess) => {
    // const guess = await apiCalls.makeGuess(newGuess)
    // this.setState({guess})
    console.log('makeGuess')
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
