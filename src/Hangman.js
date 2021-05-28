import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words';
import AlphaButtons from './AlphaButtons';

class Hangman extends Component {
    /** by default, allow 6 guesses and use provided gallows images. */
    static defaultProps = {
        maxWrong: 6,
        images: [img0, img1, img2, img3, img4, img5, img6],
    };

    constructor(props) {
        super(props);
        this.state = {
            nWrong: 0,
            guessed: new Set(),
            answer: 'apple',
            hasWon: 0,
        };
        this.handleGuess = this.handleGuess.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
    guessedWord() {
        return this.state.answer
            .split('')
            .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
    }

    /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
    handleGuess(evt) {
        let ltr = evt.target.value;
        this.setState((st) => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
            hasWon: this.state.guessed.has(this.state.answer) ? 1 : 0,
        }));
    }

    resetGame(e) {
        this.setState((curState) => ({
            guessed: new Set(),
            nWrong: 0,
            answer: randomWord(),
        }));
    }

    handleReset(e) {
        this.resetGame();
    }

gameState(e){
    const isWinner = this.guessedWord().join("") === this.state.answer;
    if(isWinner){
        return <p>You win!</p>;
    } 
    if(this.state.nWrong >= this.props.maxWrong){
        return <p>You loose!</p>
    }
    return <AlphaButtons handleGuess={this.handleGuess} guessed={this.state.guessed}/>
}

    /** render: render game */
    render() {
        
        return (
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img
                    src={this.props.images[this.state.nWrong]}
                    alt={this.state.nWrong + ' wrong guesses'}
                />

                <p className='Hangman-word'>
                    {this.state.nWrong !== this.props.maxWrong
                        ? this.guessedWord()
                        : this.state.answer}
                </p>

                <p className='Hangman-wrongGuesses'>
                    Wrong guesses: {this.state.nWrong}
                </p>

                {this.gameState()}

                <button className='Hangman-resetBtn' onClick={this.handleReset}>
                    Reset the game
                </button>
            </div>
        );
    }
}

export default Hangman;
