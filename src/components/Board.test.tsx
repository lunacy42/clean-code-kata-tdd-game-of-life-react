import { render, screen } from '@testing-library/react';
import Board from './Board';

it('renders at least one cell', () => {
  render(<Board />);
  const cells = screen.getAllByTestId('cell', { exact: false });
  expect(cells[0]).toBeInTheDocument();
});

it('renders 1200 cells', () => {
  render(<Board />);
  const cells = screen.getAllByTestId('cell', { exact: false });
  expect(cells).toHaveLength(1200);
});

it('renders at least one living and at least one dead cell', () => {
  render(<Board />);
  const livingCells = screen.getAllByTestId('living-cell');
  const deadCells = screen.getAllByTestId('dead-cell');
  // console.log('livingCells[40].key', window.getComputedStyle(livingCells[40]).backgroundColor);
  expect(livingCells[0]).toBeInTheDocument();
  expect(deadCells[0]).toBeInTheDocument();
});

// rules
// 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

it('updates cells according to rule one', () => {
  render(<Board />);
  const cells = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  const nextCells = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  const getNextCells = (cells: (number | boolean)[][]) => {
    return cells;
  };
  expect(getNextCells(cells)).toEqual(nextCells);
});
