import { useState } from 'react';
import './Board.css';

const Board = () => {
  const numRows = 20;
  const numCols = 60;

  const getRandomCells = (filling: string) => {
    const rows = [];
    for (let y = 1; y <= numRows; y++) {
      const column = [];
      for (let x = 1; x <= numCols; x++) {
        column.push(filling === 'filled' ? Math.random() < 0.3 : 0);
      }
      rows.push(column);
    }
    return rows;
  };

  const [cells, setCells] = useState(getRandomCells('filled'));

  const getRows = (row: (number | boolean)[], i: number) => {
    return row.map((cell: number | boolean, j: number) => {
      return (
        <div
          key={`${i}-${j}`}
          className="Cell"
          data-testid={cells[i][j] ? 'living-cell' : 'dead-cell'}
          style={{ backgroundColor: cells[i][j] ? '#2da4ab' : '#fff' }}></div>
      );
    });
  };

  const getColumns = () => {
    return cells.map((row: (number | boolean)[], i: number) => {
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
