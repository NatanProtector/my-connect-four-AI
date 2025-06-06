/**
 * Bugs:
 * - Game works, ocasionally the AI player get stuck, even though i know the response came. might have somthing to do with the useAffect.
 */

import React, { useEffect, useState } from "react";
import "./ConnectFour.css";

const RED_SYMBOL = "R";
const YELLOW_SYMBOL = "Y";

const RED_TEXT = "Red";
const YELLOW_TEXT = "Yellow";

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
  const start_position = {
    board: Array(ROWS).fill(Array(COLS).fill(null)),
    turn: RED_TEXT,
  };

  // const start_position = parseBoardString("------------------------R---Y--R---Y--YRRY,1")

  const [board, setBoard] = useState(start_position.board);
  const [currentPlayer, setCurrentPlayer] = useState(start_position.turn);
  const [winner, setWinner] = useState(null);
  const [pendingMove, setPendingMove] = useState(null); // Track the move to transmit

  const [lastMove, setLastMove] = useState(null);
  const [fallPreviewCell, setFallPreviewCell] = useState(null); // Stores {row, col} for hover preview

  useEffect(() => {
    const handlePendingMove = async () => {
      if (currentPlayer !== "Red") {
        const boardString = parseBoardToString(board, currentPlayer);

        const response_col = await transmit_move(pendingMove, boardString);

        console.log("Response: ", response_col.response);

        // Wait for some time
        // await new Promise((resolve) => setTimeout(resolve, 90));

        if (response_col.response) {
          const parsedInt = parseInt(response_col.response, 10);

          make_move(parsedInt);

          setPendingMove(null);
        }
      }
    };

    handlePendingMove();
  }, [pendingMove]);

  function parseBoardString(boardString) {
    // Split the input string by commas
    const [boardPart, turnPart] = boardString.split(",");

    // Create the 6x7 board (6 rows, 7 columns)
    const board = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        var symbol = null;
        // Split each row by spaces
        if (boardPart[i * 7 + j] === YELLOW_SYMBOL) symbol = YELLOW_TEXT;
        else if (boardPart[i * 7 + j] === RED_SYMBOL) symbol = RED_TEXT;

        row.push(symbol);
      }
      board.push(row);
    }

    // The turn value is the second part of the string (either -1 or 1)
    const turn_int = parseInt(turnPart, 10);

    var turn = RED_TEXT;
    if (turn_int !== 1) turn = YELLOW_TEXT;

    return { board, turn };
  }

  const parseBoardToString = (board, turn) => {
    var result = "";
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        var symbol = "-";
        if (board[i][j] === YELLOW_TEXT) symbol = YELLOW_SYMBOL;
        else if (board[i][j] === RED_TEXT) symbol = RED_SYMBOL;

        result += symbol;
      }
    }

    var turn_int = "1";
    if (turn !== RED_TEXT) turn_int = "-1";

    result += "," + turn_int;

    return result;
  };

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
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          board[r][c] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i <= 3; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          board[r][c] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) return true;
    }

    return false;
  };

  const findLowestEmptyRow = (col) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!board[r][col]) {
        return r;
      }
    }
    return -1; // Column is full
  };

  const handleColumnMouseEnter = (col) => {
    if (winner || currentPlayer !== RED_TEXT) return; // Don't show preview if game over or not human's turn
    const fallRow = findLowestEmptyRow(col);
    if (fallRow !== -1) {
      setFallPreviewCell({ row: fallRow, col: col });
    } else {
      setFallPreviewCell(null); // Column is full
    }
  };

  const handleBoardMouseLeave = () => {
    setFallPreviewCell(null);
  };

  const make_move = (col) => {
    const newBoard = board.map((row) => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        if (checkWin(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        }
        const new_player = currentPlayer === RED_TEXT ? YELLOW_TEXT : RED_TEXT;
        setLastMove({ row, col });
        setBoard(newBoard);
        setCurrentPlayer(new_player);
        setPendingMove(col);
        return;
      }
    }
    return;
  };

  const handleClick = (col) => {
    if (winner || currentPlayer !== RED_TEXT) return;

    make_move(col);
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(Array(COLS).fill(null)));
    setCurrentPlayer(RED_TEXT);
    setWinner(null);
    setLastMove(null);
  };
  const transmit_move = (col, board_string) => {
    const move = {
      col: col,
      board_string: board_string,
    };

    return new Promise((resolve, reject) => {
      // Send post request to backend
      fetch("/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(move),
      })
        .then((response) => {
          if (!response.ok) {
            reject(`Error: ${response.statusText}`); // Reject if response is not ok
          } else {
            return response.json(); // Parse the response as JSON
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  };

  return (
    <div className="App">
      {winner ? (
        <h2>
          <span style={{ color: winner === RED_TEXT ? "red" : "yellow" }}>
            {winner}{" "}
          </span>
          Wins!
        </h2>
      ) : (
        <h2>
          Current Player:{" "}
          <span
            className={currentPlayer === RED_TEXT ? "red-text" : "yellow-text"}
          >
            {currentPlayer}
          </span>
        </h2>
      )}
      <div className="board" onMouseLeave={handleBoardMouseLeave}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              const cellClasses = ["cell"];
              if (cell) {
                // 'Red' or 'Yellow'
                cellClasses.push(cell);
              }
              if (
                lastMove &&
                lastMove.col === colIndex &&
                lastMove.row === rowIndex
              ) {
                cellClasses.push("highlight");
              }
              if (
                fallPreviewCell &&
                fallPreviewCell.row === rowIndex &&
                fallPreviewCell.col === colIndex
              ) {
                // Make sure it's an empty cell for preview
                if (!board[rowIndex][colIndex]) {
                  cellClasses.push(
                    currentPlayer === RED_TEXT
                      ? "fall-preview-red"
                      : "fall-preview-yellow"
                  );
                }
              }

              return (
                <div
                  key={colIndex}
                  className={cellClasses.join(" ")}
                  onClick={() => handleClick(colIndex)}
                  onMouseEnter={() => handleColumnMouseEnter(colIndex)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default ConnectFour;
