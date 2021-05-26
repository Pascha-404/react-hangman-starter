import React, { Component } from 'react'

class AlphaButtons extends Component {
    /** generateButtons: return array of letter buttons to render */
    generateButtons() {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
            <button
                value={ltr}
                key={ltr}
                onClick={this.props.handleGuess}
                disabled={this.props.guessed.has(ltr)}>
                {ltr}
            </button>
        ));
    }
    render(){
        return(<p className='Hangman-btns'>{this.generateButtons()}</p>)
    }
}

export default AlphaButtons;