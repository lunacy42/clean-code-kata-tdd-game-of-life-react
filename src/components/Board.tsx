import { useState } from 'react';
import './Board.css';

export const getNextCells = (cells: number[][]) => {
  const neighborPositions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];
  return cells.map((row, i) => {
    return row.map((column, j) => {
      let neighbors = 0;
      neighborPositions.forEach((pos) => {
        if (
          i + pos[0] > 0 &&
          i + pos[0] < cells.length &&
          j + pos[1] > 0 &&
          j + pos[1] < row.length
        ) {
          neighbors += cells[i + pos[0]][j + pos[1]];
        }
      });
      if (neighbors < 2) {
        return 0; // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      }
      return 0;
    });
  });
};

const Board = () => {
  const numRows = 20;
  const numCols = 60;
  const getRandomCells = (filling: string) => {
    const rows = [];
    for (let y = 1; y <= numRows; y++) {
      const column = [];
      for (let x = 1; x <= numCols; x++) {
        column.push(filling === 'filled' ? Number(Math.random() < 0.3) : 0);
      }
      rows.push(column);
    }
    return rows;
  };

  const [cells, setCells] = useState<number[][]>(getRandomCells('filled'));

  const updateCells = () => {
    const newCells = getNextCells(cells);
    setCells(newCells);
  };

  const getRows = (row: number[], i: number) => {
    return row.map((cell: number, j: number) => {
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
