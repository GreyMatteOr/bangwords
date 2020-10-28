import '@testing-library/jest-dom';
import { WordSelector } from './WordSelector.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('WordSelector', () => {

  describe('Testing the Heading', () => {
    it('should render the default heading if the `isGenerator` prop is true', () => {

      render(<WordSelector isGenerator={true}/>);
  
      expect(screen.getByText('Type a word for your opponent to guess!')).toBeInTheDocument();
    })

    it('should not render the default heading if the `isGenerator` prop is true', () => {

      render(<WordSelector />);
  
      expect(screen.getByText('Your opponent is thinking of a word...')).toBeInTheDocument();
    })
  })
})
