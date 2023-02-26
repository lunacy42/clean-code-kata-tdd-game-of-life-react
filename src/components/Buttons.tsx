import { useState } from 'react';
import './Board.css';

const Buttons = () => {
  const [running, setRunning] = useState(false);
  const start = () => {
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  const empty = () => {
    setRunning(true);
  };

  const reset = () => {
    setRunning(true);
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
