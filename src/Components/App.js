import '../App.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { createContext , useState } from 'react';
import { boardDefault } from './Words';
import GameOver from './GameOver';

export const AppContext = createContext()

function App() {
 
  const [ board, setBoard ] = useState(boardDefault)
  const [ currAttempt, setCurAttempt ] = useState({ attemp: 0, letterPos: 0 })
  const [ isGameOver, setGameOver ] = useState(false)
  const [ isGameWon, setGameWon ] = useState(false)

  const newBoard = [...board]
  
  const correctWord = "RIGHT"

  const onEnter = () => {
    let currWord = board[currAttempt.attemp].reduce((prevChar,currChar) => prevChar + currChar )
    if(currAttempt.letterPos !== 5) alert("please fill up the row") 
    else {
      if(currWord === correctWord) {
        setGameOver(true)
        setGameWon(true)
      }
      else if(currAttempt.attemp === 5) setGameOver(true) 
      setCurAttempt({ letterPos : 0 , attemp : currAttempt.attemp + 1 })
    }
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0 && currAttempt.attemp === 0) return
    newBoard[currAttempt.attemp][currAttempt.letterPos-1] = "";
    setBoard(newBoard)
    if (currAttempt.letterPos === 1 && currAttempt.attemp !== 0) {
      setCurAttempt({ attemp: currAttempt.attemp - 1, letterPos: 5 })
    } else {
      setCurAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
    }
  }

  const onSelectLetter = (keyVal) => {
    if(currAttempt.attemp === 5 && currAttempt.letterPos === 5) alert("All rows are full")
    else if(currAttempt.letterPos > 4) alert("row is full, click enter to move to next line")
    else {
      newBoard[currAttempt.attemp][currAttempt.letterPos] = keyVal;
      setCurAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
      setBoard(newBoard)
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
        <p>Guess a word that has 5 characters!</p>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurAttempt,
        onEnter,
        onDelete,
        onSelectLetter,
        correctWord,
      }}>
        <div className='game'>
          <Board/>
          {isGameOver ? <GameOver correctWord={correctWord} attempt={currAttempt.attemp} isGameWon={isGameWon}/> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
