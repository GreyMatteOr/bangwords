import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import  { Homepage }  from '../src/Homepage/Homepage.js';
import  { WordSelector }  from '../src/WordSelector/WordSelector.js';
import  { Gamepage }  from '../src/Gamepage/Gamepage.js';
import  { Lobby }  from '../src/Lobby/Lobby.js';
import  { Footer }  from '../src/Footer/Footer.js';
import History from './History.js';
import './App.scss';

import ioc from 'socket.io-client';

let client;

export class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      attempts: [],
      chat: [],
      display: [],
      inRoom: this.props.inRoom || false,
      isGameReady: this.props.isGameReady || false,
      isGenerator: this.props.isGenerator || null,
      isLoading: true,
      isOver: false,
      hasGenerator: null,
      hasWord: false,
      userName: this.props.userName || 'guest',
      rooms: this.props.rooms || [],
      numOnline: 'calculating the number of',
      attemptsLeft: 0,
      playerNames: [],
      winners:['--REDACTED--']
    }
  }

  componentDidMount = () => {
    // client = ioc.connect( "https://bangwords-api.herokuapp.com/");
    client = ioc.connect( "localhost:3001");

    client.on( 'chatMessage', (message) => {
      let chat = this.state.chat.concat();
      chat.push(message);
      this.setState({ chat })
    })

    client.on( 'result', (state) => {
      console.log('NEW:', state)
      this.setState(state);
    });

    this.setState({isLoading: false});
  }

  createRoom = ( id ) => {
    client.emit('createRoom', id);
  }

  joinRoom = ( id ) => {
    client.emit('joinRoom', id);
  }

  leaveRoom = () => {
    console.log('hello')
    client.emit('leaveRoom');
    this.setState({ chat: [] })
  }

  makeGuess = (newGuess) => {
    client.emit('makeGuess', newGuess)
  }

  setRole = (role) => {
    client.emit('setRole', role, this.state.userName);
    this.setState({isGenerator: role});
  }

  sendMessage = (message) => {
    client.emit('sendMessage', message);
  }

  sendWordToGuess = (word) => {
    client.emit('setWord', word);
  }

  setUserName = (userName) => {
    this.setState({ userName })
  }

  // forfeitGame = () => {
  //   client.emit('clear')
  // }

  setHistory() {
    if (!this.state.inRoom && History[History.length -1] !== '/lobby') {
      window.setTimeout(() => History.push('/lobby'), 1);
    }

    else if (this.state.isGameReady && this.state.isGenerator !== null && History[History.length -1] !== '/gamepage') {
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
      <>
      <div className="BangWords">
        <header className="BangWords-header">
          <h1 id='bangHeader'>BangWords</h1>
          <div className='headerCenter'>
            <h3 className='loggedInAs'>Logged in as: {this.state.userName}!
            </h3>
            <h4 className='playersOnline'>{this.state.numOnline} players online right now
            </h4>
          </div>
          <div className='headerRight'>
            {/* <button
              id='forfeitGame'
              onClick={this.props.forfeitMock || this.forfeitGame}
              data-testid="forfeit-test"
            >
              <em>Reset Game</em>
            </button> */}
            <button
              className={!this.state.inRoom ? 'hidden' : 'leave'}
              onClick={this.leaveRoom}>
              <em>Leave Game</em>
            </button>
          </div>
        </header>

        <Route
          exact path='/bangwords'
          render={() => {
            return (
              <Homepage
                designateRole={this.props.mockRole || this.setRole}
                hasGenerator={this.state.hasGenerator}
              />
            )
          }}
        />

        <Route
          exact path='/gamepage'
          render={() => {
            return (
              <Gamepage
                attempts={this.state.attempts}
                attemptsLeft={this.state.attemptsLeft}
                chat={this.state.chat}
                display={this.state.display}
                isGenerator={this.state.isGenerator}
                isOver={this.state.isOver}
                makeGuess={this.props.fakeAGuess || this.makeGuess}
                playerNames={this.state.playerNames}
                scores={this.state.scores}
                sendMessage={this.sendMessage}
                winners={this.state.winners}
              />
            )
          }}
        />

        <Route
          exact path='/lobby'
          render={() => {
            return (
              <Lobby
                createRoom={this.props.mockCreateRoom || this.createRoom}
                joinRoom={this.props.mockJoinRoom || this.joinRoom}
                rooms={this.state.rooms}
                setUserName={this.props.mockSetName || this.setUserName}
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
                hasGenerator={this.state.hasGenerator}
                hasWord={this.state.hasWord}
              />
            )
          }}
        />
      </div>
        <Footer/>
        </>
    );
  }
}

export default App;
