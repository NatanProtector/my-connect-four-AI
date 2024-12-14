// src/App.js
import React, { useState } from "react";
import "./ConnectFour.css";

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(ROWS).fill(Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [winner, setWinner] = useState(null);

  const checkWin = (board, row, col, player) => {
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal (down-right)
      { dr: 1, dc: -1 }, // Diagonal (down-left)
    ];

    for (let { dr, dc } of directions) {
      let count = 1;
      for (let i = 1; i <= 3; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i <= 3; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const handleClick = (col) => {
    if (winner) return;

    const newBoard = board.map((row) => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        if (checkWin(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        }
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(Array(COLS).fill(null)));
    setCurrentPlayer("Red");
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>Connect Four</h1>
      {winner ? <h2>{winner} Wins!</h2> : <h2>Current Player: {currentPlayer}</h2>}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell}`}
                onClick={() => handleClick(colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default ConnectFour;
