import { useState } from 'react';
import useInterval from '../hooks/useInterval';
import { getNextCells } from '../utils/getNextCells';
import Board from './Board';
import './Board.css';
import Buttons from './Buttons';

const Game = () => {
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
  const [running, setRunning] = useState<boolean>(false);

  const updateCells = () => {
    const newCells = getNextCells(cells);
    setCells(newCells);
  };

  useInterval(() => running && updateCells(), 500);

  return (
    <div>
      <Board cells={cells} setCells={setCells} />
      <Buttons setRunning={setRunning} getRandomCells={getRandomCells} setCells={setCells} />
    </div>
  );
};

export default Game;
