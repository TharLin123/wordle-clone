import React from 'react'

const GameOver = ({correctWord, attempt, isGameWon}) => {
  return (
    <div>
      <h1>You {isGameWon ? "Won" : "Lost"}!</h1>
      <h2>The correct word is {correctWord}.</h2>
      {isGameWon && <h3>You made it in {attempt} attmept.</h3>}
    </div>
  )
}

export default GameOver