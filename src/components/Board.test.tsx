import { render, screen } from '@testing-library/react';
import Board from './Board';

it('renders at least one cell', () => {
  render(<Board />);
  const cells = screen.getAllByTestId("cell");
  expect(cells[0]).toBeInTheDocument();
});

it('renders 1200 cells', () => {
  render(<Board />);
  const cells = screen.getAllByTestId("cell");
  expect(cells).toHaveLength(1200);
});
