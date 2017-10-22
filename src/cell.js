
class Cell {

  constructor(x, y, len) {
    this.x = x;
    this.y = y;
    this.len = len;
    // north east south west
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  removeWalls(other) {

    let x = this.x - other.x;
    let y = this.y - other.y;
    
    if (x < 0) {
      this.walls[1] = false;
      other.walls[3] = false;
    } else if (x > 0) {
      this.walls[3] = false;
      other.walls[1] = false;
    }

    if (y < 0) {
      this.walls[2] = false;
      other.walls[0] = false;
    } else if (y > 0) {
      this.walls[0] = false;
      other.walls[2] = false;
    }

  }

  draw(ctx) {
    const x = this.x
    const y = this.y
    ctx.strokeStyle = "black";

    if (this.walls[0]) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.len, y);
      ctx.stroke();
    }
    if (this.walls[1]) {
      ctx.beginPath();
      ctx.moveTo(x + this.len, y);
      ctx.lineTo(x + this.len, y + this.len);
      ctx.stroke();
    }
    if (this.walls[2]) {
      ctx.beginPath();
      ctx.moveTo(x, y + this.len);
      ctx.lineTo(x + this.len, y + this.len);
      ctx.stroke();
    }
    if (this.walls[3]) {
      ctx.beginPath();
      ctx.moveTo(x, y + this.len);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (this.visited) {
      ctx.fillStyle = "orange";
      ctx.fillRect(x, y, this.len, this.len);
    }
  }

}

module.exports = Cell;