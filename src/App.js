import React, { Component } from 'react';
import './App.css';

export class App extends Component{
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="BangWords">
        <header className="BangWords-header">
          BangWords
        </header>
        <div className="character-select">
          <button className="generator">Generator</button>
          <button className="Guesser">Guesser</button>
        </div>
        <h1>Score: </h1>

      </div>
    );
  }
}

export default App;
