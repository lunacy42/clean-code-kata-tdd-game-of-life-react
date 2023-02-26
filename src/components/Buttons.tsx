import { useState } from 'react';
import './Board.css';

interface ButtonProps {
  setRunning: (value: boolean) => void;
  getRandomCells: (value: string) => number[][];
  setCells: (value: number[][]) => void;
}

const Buttons = ({ setRunning, setCells, getRandomCells }: ButtonProps) => {
  const start = () => {
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  const empty = () => {
    setCells(getRandomCells('empty'));
  };

  const reset = () => {
    setCells(getRandomCells('filled'));
  };

  return (
    <div className="Buttons">
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={empty}>Empty</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Buttons;
