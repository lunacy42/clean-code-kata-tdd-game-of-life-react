import { useState } from 'react';
import './Board.css';

const Board = () => {
  const numRows = 20;
  const numCols = 60;

  const getCells = () => {
    let rows = [];
    for (let y = 1; y <= numRows; y++) {
      let column = [];
      for (let x = 1; x <= numCols; x++) {
        column.push(0);
      }
      rows.push(column);
    }
    return rows;
  };

  const [cells, setCells] = useState(getCells());

  const getRows = (row: number[], i: number) => {
    return row.map((cell: number, j: number) => {
      return <div key={`${i}-${j}`} className="Cell" data-testid="cell"></div>;
    });
  };

  const getColumns = () => {
    return cells.map((row: number[], i: number) => {
      return (
        <div key={i} className="Row">
          {getRows(row, i)}
        </div>
      );
    });
  };

  return <div className="Board">{getColumns()}</div>;
};

export default Board;
