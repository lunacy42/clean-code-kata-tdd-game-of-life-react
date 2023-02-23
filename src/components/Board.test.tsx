import { render, screen } from '@testing-library/react';
import Board from './Board';

it('renders cells', () => {
  render(<Board />);
  const cells = screen.getAllByTestId("cell");
  expect(cells).toBeInTheDocument();
});
