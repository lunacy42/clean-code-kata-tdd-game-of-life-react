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
  expect(livingCells[0]).toBeInTheDocument();
  expect(deadCells[0]).toBeInTheDocument();
});
