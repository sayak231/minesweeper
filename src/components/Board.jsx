import React, { useState, useEffect } from "react";
import Cell from "./Cell.jsx";
import CreateBoard from "../utils/CreateBoard.js";
import { revealed } from "./../utils/revealed";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [mineLocation, setmineLocation] = useState([]);

  const style = {
    display: "flex",
    flexDirection: "row",
  };

  useEffect(() => {
    const freshBoard = () => {
      const newBoard = CreateBoard(10, 10, 20);
      setNonMinecount(10 * 10 - 20);
      setmineLocation(newBoard.mineLocation);
      setGrid(newBoard.board);
    };
    freshBoard();
  }, []);

  const revealcell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "💣") {
      alert("you clicked mine");
      for (let i = 0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
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
      <span className="count">Non-Mines : {nonMinecount}</span>
      <div className="cells-container">
        {grid.map((singlerow, index1) => {
          return (
            <div style={style} key={index1}>
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
    </div>
  );
}
export default Board;
