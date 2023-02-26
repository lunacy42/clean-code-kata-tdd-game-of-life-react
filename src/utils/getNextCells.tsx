export const getNextCells = (cells: number[][]) => {
  const neighborPositions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];
  return cells.map((row, i) => {
    return row.map((column, j) => {
      let neighbors = 0;
      neighborPositions.forEach((pos) => {
        if (
          i + pos[0] >= 0 &&
          i + pos[0] < cells.length &&
          j + pos[1] >= 0 &&
          j + pos[1] < row.length
        ) {
          neighbors += cells[i + pos[0]][j + pos[1]];
        }
      });
      if (neighbors === 3) {
        return 1;
      } // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (neighbors > 1 && neighbors < 4 && cells[i][j] === 1) {
        return 1;
      } // Any live cell with two or three live neighbours lives on to the next generation.

      return 0; // Any live cell with fewer than two live neighbours dies, as if by underpopulation. && Any live cell with more than three live neighbours dies, as if by overpopulation.
    });
  });
};
