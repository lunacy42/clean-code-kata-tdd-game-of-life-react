import './Board.css';

interface BoardProps {
  cells: number[][];
  setCells: (value: number[][]) => void;
}

const Board = ({ cells, setCells }: BoardProps) => {
  const handleClick = (i: number, j: number) => {
    const newCells = cells;
    newCells[i][j] = cells[i][j] ? 0 : 1;
    setCells([...newCells]);
  };

  const getRows = (row: number[], i: number) => {
    return row.map((cell: number, j: number) => {
      return (
        <div
          key={`${i}-${j}`}
          className="Cell"
          onClick={() => handleClick(i, j)}
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
