/**
 * PROBLEM: Cell Growth Simulation
 *
 * You are given a 2D grid where each cell contains a non-negative integer
 * representing its "growth level".
 *
 * In one simulation step:
 * - Each cell with value >= 2 will "spread" growth to its adjacent cells
 *   (up, down, left, right - NOT diagonals)
 * - Adjacent cells receive +1 growth
 * - All updates happen simultaneously (use the state from the beginning of the step)
 *
 * Return the grid after performing K simulation steps.
 *
 * CONSTRAINT: You must handle grids of any size (not just 3x3)
 *
 * Example:
 * Input: grid = [[0,1,0],
 *                [0,3,0],
 *                [0,1,0]], k = 1
 *
 * Output: [[0,2,0],
 *          [1,3,1],
 *          [0,2,0]]
 *
 * @param {number[][]} grid - The initial grid state
 * @param {number} k - Number of simulation steps
 * @return {number[][]} - Grid after k steps
 */

function simulateCellGrowth(grid, k) {
  // Your implementation here
  const rows = grid.length;
  const cols = grid[0].length;  
  
  for (let step = 0; step < k; step++) {
    const newGrid = grid.map(row => [...row]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] >= 2) {
          // visit adjacent cells and increment their growth
          const directions = [[-1,0], [1,0], [0,-1], [0,1]];
          for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
              newGrid[ni][nj]++;
            }
          }
        }
      }
    }
    grid = newGrid;
  }
  
  return grid;
}

module.exports = simulateCellGrowth;
