import '@testing-library/jest-dom';
import { WordSelector } from './WordSelector.js';
import { screen, render, waitFor } from '@testing-library/react';

describe('WordSelector', () => {

  describe('Heading', () => {
    it('1. should render the default heading if the `isGenerator` prop is true', () => {

      render(<WordSelector isGenerator={true}/>);
  
      expect(screen.getByText('Type a word for your opponent to guess!')).toBeInTheDocument();
    })

    it('2. should not render the default heading if the `isGenerator` prop is not true', () => {

      render(<WordSelector />);
  
      expect(screen.getByText('Your opponent is thinking of a word...')).toBeInTheDocument();
    })
  })

  describe('Inputs', () => {
    
    describe('Inputs', () => {
      it('3. should render the `Name` input if the `isGenerator` prop is true', () => {

        render(<WordSelector isGenerator={true}/>);
    
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      })

      it('4. should render the `Submit` input if the `isGenerator` prop is true', () => {

        render(<WordSelector isGenerator={true}/>);
    
        expect(screen.getByPlaceholderText('Submit')).toBeInTheDocument();
      })
    })
  })
})
