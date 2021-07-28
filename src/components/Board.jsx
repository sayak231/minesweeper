import React, { useState, useEffect } from "react";
import Cell from "./Cell.jsx";
import createBoard from "../utils/CreateBoard.js";
import { revealed } from "./../utils/revealed";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [clickedMine, setClickedMine] = useState(false);

  const freshBoard = () => {
    setClickedMine(false);
    const newBoard = createBoard(10, 10, 20);
    setNonMinecount(10 * 10 - 20);
    setGrid(newBoard);
  };

  useEffect(() => {
    freshBoard();
  }, []);

  const revealcell = (x, y) => {
    let newGrid = [...grid];
    if (newGrid[x][y].value === "💣") {
      setClickedMine(true);
      for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[0].length; j++) {
          newGrid[i][j].revealed = true;
        }
      }
      setGrid(newGrid);
    } else {
      let revealedboard = revealed(newGrid, x, y, nonMinecount);
      setGrid(revealedboard.arr);
      setNonMinecount(revealedboard.newNonMines);
    }
  };

  return (
    <div className="grid">
      <span className="count">Clicks to Win : {nonMinecount}</span>
      <div className="cells-container">
        {grid.map((singlerow, index1) => {
          return (
            <div className="flex-row" key={index1}>
              {singlerow.map((singlecol, index2) => {
                return (
                  <Cell
                    details={singlecol}
                    key={index2}
                    revealcell={revealcell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {clickedMine && (
        <>
          <span className="lost">Game Over !</span>
          <button onClick={() => freshBoard()} className="play-again">
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
export default Board;
