import { render, screen } from '@testing-library/react';
import Board, { getNextCells } from './Board';

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
  const cells1 = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  const nextCells1 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  const cells2 = [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  const nextCells2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  const cells3 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  const nextCells3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  const cells4 = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 0]
  ];
  const nextCells4 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  expect(getNextCells(cells1)).toEqual(nextCells1);
  expect(getNextCells(cells2)).toEqual(nextCells2);
  expect(getNextCells(cells3)).toEqual(nextCells3);
  expect(getNextCells(cells4)).toEqual(nextCells4);
});

it('updates cells according to rule two', () => {
  render(<Board />);
  const cells1 = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const nextCells1 = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const cells2 = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const nextCells2 = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const cells3 = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ];
  const nextCells3 = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 0]
  ];
  const cells4 = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 0]
  ];
  const nextCells4 = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 0]
  ];
  expect(getNextCells(cells1)).toEqual(nextCells1);
  expect(getNextCells(cells2)).toEqual(nextCells2);
  expect(getNextCells(cells3)).toEqual(nextCells3);
  expect(getNextCells(cells4)).toEqual(nextCells4);
});

it('updates cells according to rule three', () => {
  render(<Board />);
  const cells1 = [
    [1, 1, 1],
    [0, 1, 1],
    [0, 0, 0]
  ];
  const nextCells1 = [
    [1, 0, 1],
    [0, 0, 1],
    [0, 0, 0]
  ];
  const cells2 = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 0, 0]
  ];
  const nextCells2 = [
    [1, 0, 1],
    [1, 0, 1],
    [0, 0, 0]
  ];
  const cells3 = [
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 0]
  ];
  const nextCells3 = [
    [0, 1, 0],
    [0, 0, 0],
    [1, 1, 0]
  ];
  const cells4 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ];
  const nextCells4 = [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1]
  ];
  expect(getNextCells(cells1)).toEqual(nextCells1);
  expect(getNextCells(cells2)).toEqual(nextCells2);
  expect(getNextCells(cells3)).toEqual(nextCells3);
  expect(getNextCells(cells4)).toEqual(nextCells4);
});

it('updates cells according to rule four', () => {
  render(<Board />);
  const cells1 = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ];
  const nextCells1 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ];
  const cells2 = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
  ];
  const nextCells2 = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const cells3 = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 0]
  ];
  const nextCells3 = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const cells4 = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1]
  ];
  const nextCells4 = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
  ];
  expect(getNextCells(cells1)).toEqual(nextCells1);
  expect(getNextCells(cells2)).toEqual(nextCells2);
  expect(getNextCells(cells3)).toEqual(nextCells3);
  expect(getNextCells(cells4)).toEqual(nextCells4);
});
