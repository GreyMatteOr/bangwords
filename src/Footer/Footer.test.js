import '@testing-library/jest-dom';
import { Footer } from './Footer.js';
import { screen, render } from '@testing-library/react';
import userEvent from  '@testing-library/user-event';

describe('Footer', () => {
  
    it('should render a `Credits` button', () => {
        render(<Footer />);
        
        expect(screen.getByText('Credits')).toBeInTheDocument();
    })
    it('should render names when the `Credits` button has been clicked', () => {
        render(<Footer />);
        userEvent.click(screen.getByText('Credits'));
        expect(screen.getByText('Matt')).toBeInTheDocument();
        expect(screen.getByText('Ian')).toBeInTheDocument();
        expect(screen.getByText('Chris')).toBeInTheDocument();
    })
})