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
      isGenerator: null,
      numPlayers: 0,
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
    if (this.state.numPlayers > 1 && !this.state.word && History[History.length -1] !=='/word-selector') {
      History.push('/word-selector');
    
    //   return (
    //     <Route
    //     path='/word-selector'
    //     render={() => {
    //     return  <WordSelector makeWordToGuess={this.makeWordToGuess}/>
    //     }}
    //   />
    //   )
    } else if (this.state.numPlayers > 1 && this.state.word && History[History.length -1] !=='/gamepage') {
      History.push('/gamepage');
    //   return (
    //     <Route
    //     path='/gamepage'
    //     render={() => {
    //     return  <Gamepage makeGuess={this.makeGuess} attempts={this.state.attempts} display={this.state.display}/>
    //     }}
    //   />
    //   )
    } else if (History[History.length -1] !=='/') {
      History.push('/');
    //   return (
    //     <Route
    //     path='/'
    //     render={() => {
    //     return  <Homepage designateRole={this.designateRole}/>
    //     }}
    //   />
    //   )
    }
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
