import '@testing-library/jest-dom';
import { App } from './App.js';
import { screen, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";



describe('App', () => {

  it('should load a `Homepage` by default', () => {

    let mockHistory = createMemoryHistory();

    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );

    let homepage = screen.getByTestId('homepage');
    let wordSelector = screen.queryByTestId('word-selector');
    let gamepage = screen.queryByTestId('game-page');

    expect(homepage).toBeInTheDocument();
    expect(wordSelector).toEqual(null);
    expect(gamepage).toEqual(null);
  })

  it('should load a `WordSelector` when the url is appropriate', () => {

    let mockHistory = createMemoryHistory();
    mockHistory.push('/word-selector');

    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );

    let homepage = screen.queryByTestId('homepage');
    let wordSelector = screen.getByTestId('word-selector');
    let gamepage = screen.queryByTestId('game-page');

    expect(homepage).toEqual(null);
    expect(wordSelector).toBeInTheDocument();
    expect(gamepage).toEqual(null);
  })

  it('should load a `WordSelector` when the url is appropriate', () => {

    let mockHistory = createMemoryHistory();
    mockHistory.push('/gamepage');

    render(
      <Router history={mockHistory}>
        <App />
      </Router>
    );

    let homepage = screen.queryByTestId('homepage');
    let wordSelector = screen.queryByTestId('word-selector');
    let gamepage = screen.queryByTestId('game-page');

    expect(homepage).toEqual(null);
    expect(wordSelector).toEqual(null);
    expect(gamepage).toBeInTheDocument();
  })
})
