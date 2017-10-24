


class SolveBFS {

  constructor(maze) {
    this.maze = maze;

    this.start = maze.cells[0][0]
    this.current = this.start;
    this.finish = maze.cells[maze.cells[0].length - 1][maze.cells.length - 1];
    this.queue = [];
  }

  adjacentCells(cell) {
    const maze = this.maze;
    const inBounds = () => {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      }

    let neighbors = [];
    let x;
    let y;
    const add = [];
    if (!cell.walls[0]) {
      add.push([0, -maze.len])
    }
    if (!cell.walls[1]) {
      add.push([maze.len, 0])
    }
    if (!cell.walls[2]) {
      add.push([0, maze.len])
    }
    if (!cell.walls[3]) {
      add.push([-maze.len, 0])
    }

    for (let i=0; i < add.length; i++) {
      x = cell.x + add[i][0];
      y = cell.y + add[i][1];
      let neighborCell = this.findCell(x, y);
      if (inBounds() && neighborCell && !neighborCell.explored) {
        neighbors.push(neighborCell);
      }
    }
    if (neighbors.length > 0) {
      return neighbors;
    }
  }

  findCell(x, y) {
    const maze = this.maze
    for (let i=0; i < maze.cells.length; i++) {
      for (let j=0; j < maze.cells[0].length; j++) {
        let cell = maze.cells[i][j];
        if (cell.x === x && cell.y === y) {
          return cell;
        }
      }
    }
    return null;
  }

  algorithm() {
    const maze = this.maze;
    if (this.current !== this.finish) {
      const neighbors = this.adjacentCells(this.current);
      if (neighbors) {
        neighbors.forEach(neighbor => {
          neighbor.parent = this.current;
          this.queue.push(neighbor);
        })
      }
      let next = this.queue.shift();
      next.explored = true;
      this.current = next;
    }
  }

  path() {
    if (this.pathfinder === this.start) {
      this.maze.solving = false;
      this.maze.solved = true;
    } else if (!this.pathfinder) {
      this.pathfinder = this.finish.parent;
    } else {
      this.pathfinder.path = true;
      this.pathfinder = this.pathfinder.parent;
    }
  }

  draw(ctx) {
    const maze = this.maze;
    maze.cells.forEach( row => {
      row.forEach( cell => {
        cell.draw(ctx);
      });
    });
    this.current.highlight(ctx);
    this.start.highlightStart(ctx);
    this.finish.highlightEnd(ctx);
    if (this.current === this.finish) {
      this.path();
    } else {
      this.algorithm();
    }
  }

}

module.exports = SolveBFS;