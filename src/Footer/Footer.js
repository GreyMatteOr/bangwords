import './Footer.scss';
import React, { Component } from 'react';

export class Footer extends Component{
    constructor() {
        super()
        this.state = {
            creditsClicked: false
        }
    }
    render() {
        return (
            <div className="footer">
                <button
                id='credits'
                  onClick={
                    () => this.setState({creditsClicked: !this.state.creditsClicked})
                  }
                >
                <em>Credits</em>
                </button>

                <a 
                href='https://github.com/GreyMatteOr' 
                id='creditName' 
                className={!this.state.creditsClicked ? 'hidden' : 'showNames'}
                ><p className='p'>Matt</p></a>

                <a 
                href='https://github.com/holladayian' 
                id='creditName' 
                className={!this.state.creditsClicked ? 'hidden' : 'showNames'}
                ><p className='p'>Ian</p></a>

                <a 
                href='https://chriscastanuela.github.io/Christopher-Anthony-Castanuela/' 
                id='creditName' 
                className={!this.state.creditsClicked ? 'hidden' : 'showNames'}><p className='p'>Chris</p></a>
            </div>
        )
    }
}