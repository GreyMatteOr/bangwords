import React from 'react'
import '@testing-library/jest-dom';
import { Chat } from './Chat.js';
import { screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('Inputs exist', () => {

  describe(' `Chat` input ', () => {
    it('1. should render the `Chat` input`', () => {
        let mockFn = jest.fn();
        render(<Chat
            chat={['chris, matt, ian']}
            debug={true}
            sendMessage={mockFn}
        />);

      expect(screen.getByPlaceholderText('Chat')).toBeInTheDocument();
    })
    it('2. should render `Send` button', () => {

        let mockFn = jest.fn();
        render(<Chat
            chat={['chris, matt, ian']}
            debug={true}
            sendMessage={mockFn}
        />);
        expect(screen.getByText('Send')).toBeInTheDocument();
    })
  })

  describe('Functionality', () => {
    it('3. should send chats', () => {

            let mockFn = jest.fn();
            render(<Chat
                chat={['chris, matt, ian']}
                debug={true}
                sendMessage={mockFn}
            />);
            userEvent.type(screen.getByPlaceholderText('Chat'), 'Chris')
            setTimeout(() => {
                userEvent.click(screen.queryByTestId('Send'))
                setTimeout(() => {
                    expect(screen.getByText('Chris')).toHaveBeenCalledWith('Chris');
                }, 1000)
            }, 1000)
        })
    })
})
