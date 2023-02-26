import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import useInterval from '../hooks/useInterval';
import { getNextCells } from '../utils/getNextCells';
import Game from './Game';

it('renders at least one cell', () => {
  render(<Game />);
  const cells = screen.getAllByTestId('cell', { exact: false });
  expect(cells[0]).toBeInTheDocument();
});

it('renders 1200 cells', () => {
  render(<Game />);
  const cells = screen.getAllByTestId('cell', { exact: false });
  expect(cells).toHaveLength(1200);
});

it('renders at least one living and at least one dead cell', () => {
  render(<Game />);
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
  render(<Game />);
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
  render(<Game />);
  const cells1 = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];
  const nextCells1 = [
    [1, 1, 0],
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
    [0, 1, 1],
    [1, 1, 0]
  ];
  const cells4 = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 0]
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

it('updates cells according to rule three', () => {
  render(<Game />);
  const cells1 = [
    [1, 1, 1],
    [0, 1, 1],
    [0, 0, 0]
  ];
  const nextCells1 = [
    [1, 0, 1],
    [1, 0, 1],
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
    [0, 1, 0]
  ];
  const cells3 = [
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 0]
  ];
  const nextCells3 = [
    [1, 1, 0],
    [0, 0, 1],
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
  render(<Game />);
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

it('calls useInterval-hook every 500ms', () => {
  const callback: any = jest.fn();

  jest.useFakeTimers();

  renderHook(() => useInterval(callback, 500));
  render(<Game />);
  const startButton = screen.getByText('Start');
  fireEvent.click(startButton);
  jest.advanceTimersByTime(499);
  expect(callback).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalledTimes(1);
  jest.advanceTimersByTime(50000);
  expect(callback).toHaveBeenCalledTimes(101);
});

it('starts game after clicking start button', () => {
  const callback: any = jest.fn();

  jest.useFakeTimers();

  renderHook(() => useInterval(callback, 500));
  render(<Game />);
  // no callbacks if game not started
  jest.advanceTimersByTime(5000);
  expect(callback).toHaveBeenCalledTimes(0);

  // start game
  const startButton = screen.getByText('Start');
  fireEvent.click(startButton);

  jest.advanceTimersByTime(499);
  expect(callback).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalledTimes(1);
  jest.advanceTimersByTime(50000);
  expect(callback).toHaveBeenCalledTimes(101);
});

it('stops game after clicking stop button', () => {
  const callback: any = jest.fn();

  jest.useFakeTimers();

  renderHook(() => useInterval(callback, 500));
  render(<Game />);
  // no callbacks if game not started
  jest.advanceTimersByTime(5000);
  expect(callback).toHaveBeenCalledTimes(0);

  // start game
  const startButton = screen.getByText('Start');
  fireEvent.click(startButton);

  jest.advanceTimersByTime(499);
  expect(callback).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalledTimes(1);
  jest.advanceTimersByTime(50000);
  expect(callback).toHaveBeenCalledTimes(101);

  // stop game
  const stopButton = screen.getByText('Stop');
  fireEvent.click(stopButton);

  jest.advanceTimersByTime(5000);
  expect(callback).toHaveBeenCalledTimes(101);
});

it('empties board after clicking empty button', () => {
  render(<Game />);

  const emptyButton = screen.getByText('Empty');
  fireEvent.click(emptyButton);

  const livingCells = screen.getAllByTestId('living-cell');
  const deadCells = screen.getAllByTestId('dead-cell');
  expect(livingCells[0]).not.toBeInTheDocument();
  expect(deadCells[0]).toBeInTheDocument();
});

it('resets board after clicking reset button', () => {
  render(<Game />);

  const emptyButton = screen.getByText('Empty');
  fireEvent.click(emptyButton);

  const livingCells = screen.getAllByTestId('living-cell');
  const deadCells = screen.getAllByTestId('dead-cell');
  expect(livingCells[0]).not.toBeInTheDocument();
  expect(deadCells[0]).toBeInTheDocument();

  const resetButton = screen.getByText('Reset');
  fireEvent.click(resetButton);

  const livingCellsAfterReset = screen.getAllByTestId('living-cell');
  const deadCellsAfterReset = screen.getAllByTestId('dead-cell');
  expect(livingCellsAfterReset[0]).toBeInTheDocument();
  expect(deadCellsAfterReset[0]).toBeInTheDocument();
});
