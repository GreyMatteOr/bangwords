import '@testing-library/jest-dom';
import { Gamepage } from './Gamepage.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('Gamepage', () => {

  describe('isGenDisplay method', () => {
    it('1. should render the `word-input` if `isGenerator is not true`', () => {

      render(<Gamepage display={['d', '_', '_', 'o', '_', 'a', 'u', 'r']} attempts={['cuts', 'butts', 'coconuts']} isGenerator={null}
      makeGuess={
        async (newGuess) => {
          // const guess = await apiCalls.makeGuess(newGuess)
          // this.setState({guess})
          console.log('newGuess', newGuess)
        }
      }
      />);

      expect(screen.getByPlaceholderText('Letter or Word')).toBeInTheDocument();
    })
    it('2. should render the `Guess` button if `isGenerator is not true`', () => {

      render(<Gamepage display={['d', '_', '_', 'o', '_', 'a', 'u', 'r']} attempts={['cuts', 'butts', 'coconuts']} isGenerator={null}
      makeGuess={
        async (newGuess) => {
          // const guess = await apiCalls.makeGuess(newGuess)
          // this.setState({guess})
          console.log('newGuess', newGuess)
        }
      }
      />);
      expect(screen.getByTestId('word-submit-button')).toBeInTheDocument();
    })
  
  // expect(screen.getByText('Attempts')).toBeInTheDocument();
  })

  describe('Render method', () => {
    it('3. should render the `Hints` title', () => {

      render(<Gamepage display={['d', '_', '_', 'o', '_', 'a', 'u', 'r']} attempts={['cuts', 'butts', 'coconuts']} isGenerator={null}
      makeGuess={
        async (newGuess) => {
          // const guess = await apiCalls.makeGuess(newGuess)
          // this.setState({guess})
          console.log('newGuess', newGuess)
        }
      }
      />);
      expect(screen.getByText('Hints')).toBeInTheDocument();
    })
  })
})
