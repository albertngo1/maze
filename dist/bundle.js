/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(x, y, len) {
    _classCallCheck(this, Cell);

    this.x = x;
    this.y = y;
    this.len = len;
    // north east south west
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  _createClass(Cell, [{
    key: "removeWalls",
    value: function removeWalls(other) {

      var x = this.x - other.x;
      var y = this.y - other.y;

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
  }, {
    key: "draw",
    value: function draw(ctx) {
      var x = this.x;
      var y = this.y;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

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
        ctx.fillStyle = "pink";
        ctx.fillRect(x, y, this.len, this.len);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, this.len, this.len);
      }

      if (this.in) {
        ctx.fillStyle = "pink";
        ctx.fillRect(x, y, this.len, this.len);
      } else if (this.frontier) {
        ctx.fillStyle = "teal";
        ctx.fillRect(x, y, this.len, this.len);
      }
    }
  }, {
    key: "highlight",
    value: function highlight(ctx) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.len, this.len);
    }
  }]);

  return Cell;
}();

module.exports = Cell;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventHandle = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function () {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = 500;
  canvas.height = 500;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  EventHandle(ctx, canvas);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GenerateDFS = __webpack_require__(3);
var GenerateSidewinder = __webpack_require__(4);
var GeneratePrim = __webpack_require__(5);
var GenerateKruskal = __webpack_require__(6);
var Maze = __webpack_require__(8);

var eventHandle = function eventHandle(ctx, canvas) {

  var maezr = void 0;

  function eventHelper() {
    $("button").prop("disabled", true);
    maezr = new Maze(canvas);
  }

  $("#instant-gen").click(function () {
    eventHelper();
    var gen = new GenerateDFS(maezr);
    maezr.generator = gen;
    maezr.generator.fast = true;
    maezr.begin();
  });

  $("#dfs-gen").click(function () {
    eventHelper();
    var gen = new GenerateDFS(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#prim-gen").click(function () {
    eventHelper();
    var gen = new GeneratePrim(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#sidewinder-gen").click(function () {
    eventHelper();
    var gen = new GenerateSidewinder(maezr);
    maezr.generator = gen;
    maezr.begin();
  });

  $("#kruskal-gen").click(function () {
    eventHelper();
    var gen = new GenerateKruskal(maezr);
    maezr.generator = gen;
    maezr.begin();
  });
};

module.exports = eventHandle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);

var GenerateDFS = function () {
  function GenerateDFS(maze) {
    _classCallCheck(this, GenerateDFS);

    this.maze = maze;
    maze.cells = [];

    this.createCells(maze);

    maze.current = maze.cells[Math.floor(Math.random() * maze.cells.length)];
    maze.current.visited = true;
    maze.stack = [];
    maze.start = maze.current;
  }

  _createClass(GenerateDFS, [{
    key: 'createCells',
    value: function createCells(maze) {
      var rows = maze.h / maze.len;
      var cols = maze.w / maze.len;
      var x = void 0;
      var y = void 0;

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          x = j * maze.len;
          y = i * maze.len;
          maze.cells.push(new Cell(x, y, maze.len));
        }
      }
    }
  }, {
    key: 'adjacentCells',
    value: function adjacentCells(cell) {
      var maze = this.maze;
      var inBounds = function inBounds() {
        if (maze.x < 0 || maze.x > maze.w || maze.y < 0 || maze.y > maze.h) {
          return false;
        } else {
          return true;
        }
      };

      var neighbors = [];
      var x = void 0;
      var y = void 0;
      var add = [[-maze.len, 0], [maze.len, 0], [0, maze.len], [0, -maze.len]];

      for (var i = 0; i < add.length; i++) {
        x = cell.x + add[i][0];
        y = cell.y + add[i][1];
        var neighborCell = this.findCell(x, y);
        if (inBounds() && neighborCell && !neighborCell.visited) {
          neighbors.push(neighborCell);
        }
      }
      if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
      }
    }
  }, {
    key: 'findCell',
    value: function findCell(x, y) {
      var maze = this.maze;
      for (var i = 0; i < maze.cells.length; i++) {
        var cell = maze.cells[i];
        if (cell.x === x && cell.y === y) {
          return cell;
        }
      }
      return null;
    }
  }, {
    key: 'algorithm',
    value: function algorithm() {
      var maze = this.maze;
      var next = this.adjacentCells(maze.current);
      if (next) {
        next.visited = true;
        maze.stack.push(maze.current);
        maze.current.removeWalls(next);
        maze.current = next;
      } else if (maze.stack.length > 0) {
        maze.current = maze.stack.pop();
        if (maze.start === maze.current) {
          maze.generating = false;
        }
      }
    }
  }, {
    key: 'fastAlgo',
    value: function fastAlgo() {
      var maze = this.maze;
      while (true) {
        var next = this.adjacentCells(maze.current);
        if (next) {
          next.visited = true;
          maze.stack.push(maze.current);
          maze.current.removeWalls(next);
          maze.current = next;
        } else if (maze.stack.length > 0) {
          maze.current = maze.stack.pop();
          if (maze.start === maze.current) {
            maze.generating = false;
            return;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var maze = this.maze;
      if (this.fast === true) {
        this.fastAlgo();
      } else {
        this.algorithm();
      }
      maze.cells.forEach(function (cell) {
        cell.draw(ctx);
      });
      if (maze.generating) {
        maze.current.highlight(ctx);
      }
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GenerateDFS;
}();

module.exports = GenerateDFS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);

var GenerateSidewinder = function () {
  function GenerateSidewinder(maze) {
    _classCallCheck(this, GenerateSidewinder);

    this.maze = maze;
    maze.cells = [];

    this.createCells(maze);

    this.currentIdx = { x: 0, y: 0 };
    this.runStart = 0;
  }

  _createClass(GenerateSidewinder, [{
    key: 'createCells',
    value: function createCells(maze) {
      var rows = maze.h / maze.len;
      var cols = maze.w / maze.len;
      var x = void 0;
      var y = void 0;

      for (var i = 0; i < rows; i++) {
        maze.cells[i] = [];
        for (var j = 0; j < cols; j++) {
          x = j * maze.len;
          y = i * maze.len;
          maze.cells[i].push(new Cell(x, y, maze.len));
        }
      }
    }
  }, {
    key: 'algorithm',
    value: function algorithm() {
      var maze = this.maze;
      var height = maze.cells.length;
      var width = maze.cells[0].length;
      if (this.currentIdx.x === width) {
        this.currentIdx.x = 0;
        this.currentIdx.y += 1;
        if (this.currentIdx.y === height) {
          return this.maze.generating = false;
        }
      }
      var x = this.currentIdx.x;
      var y = this.currentIdx.y;
      if (x === 0) {
        this.runStart = 0;
      }
      if (y > 0 && (x + 1 === width || Math.random() <= .5)) {
        var cell = this.runStart + Math.floor(Math.random() * (x - this.runStart));
        maze.cells[y][cell].removeWalls(maze.cells[y - 1][cell]);
        this.runStart = x + 1;
      } else if (x + 1 < width) {
        maze.cells[y][x].removeWalls(maze.cells[y][x + 1]);
      }
      maze.cells[y][x].visited = true;
      this.currentIdx.x += 1;
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var maze = this.maze;
      if (this.currentIdx.y < maze.cells.length) {
        this.algorithm();
      }
      maze.cells.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GenerateSidewinder;
}();

module.exports = GenerateSidewinder;

// let runStart;
// let cell;
//
// for (let y=0; y < height; y++) {
//   runStart = 0;
//   for (let x=0; x < width; x++) {
//     if (y > 0 && (x + 1 === width || Math.random() <= .5)) {
//       cell = runStart + Math.floor(Math.random() * (x - runStart + 1));
//       maze.cells[y][cell].removeWalls(maze.cells[y - 1][cell]);
//       runStart = x + 1;
//     } else if (x + 1 < width) {
//       maze.cells[y][x].removeWalls(maze.cells[y][x + 1]);
//     }
//   }
// }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);

var GeneratePrim = function () {
  function GeneratePrim(maze) {
    _classCallCheck(this, GeneratePrim);

    this.maze = maze;

    this.frontier = [];

    this.grid = [];

    this.createCells(maze);

    var row = this.grid.length;
    var cols = this.grid[0].length;
    this.mark(Math.floor(Math.random() * cols), Math.floor(Math.random() * row));
  }

  _createClass(GeneratePrim, [{
    key: "createCells",
    value: function createCells(maze) {
      var rows = maze.h / maze.len;
      var cols = maze.w / maze.len;
      var x = void 0;
      var y = void 0;

      for (var i = 0; i < rows; i++) {
        this.grid[i] = [];
        for (var j = 0; j < cols; j++) {
          x = j * maze.len;
          y = i * maze.len;
          this.grid[i].push(new Cell(x, y, maze.len));
          this.grid[i][j].frontier = false;
          this.grid[i][j].in = false;
        }
      }
    }
  }, {
    key: "addFrontier",
    value: function addFrontier(x, y) {
      if (x >= 0 && y >= 0 && x < this.grid[0].length && y < this.grid.length && this.grid[y][x].frontier === false && this.grid[y][x].in === false) {
        this.grid[y][x].frontier = true;
        this.frontier.push([x, y]);
      }
    }
  }, {
    key: "mark",
    value: function mark(x, y) {
      this.grid[y][x].in = true;
      this.addFrontier(x + 1, y);
      this.addFrontier(x - 1, y);
      this.addFrontier(x, y + 1);
      this.addFrontier(x, y - 1);
    }
  }, {
    key: "direction",
    value: function direction(x, y, nx, ny) {
      if (x < nx) {
        return "E";
      }
      if (x > nx) {
        return "W";
      }
      if (y < ny) {
        return "S";
      }
      if (y > ny) {
        return "N";
      }
    }
  }, {
    key: "neighbors",
    value: function neighbors(x, y) {
      var neighbors = [];

      if (x > 0 && this.grid[y][x - 1].in) {
        neighbors.push([x - 1, y]);
      };
      if (x + 1 < this.grid[0].length && this.grid[y][x + 1].in) {
        neighbors.push([x + 1, y]);
      };
      if (y > 0 && this.grid[y - 1][x].in) {
        neighbors.push([x, y - 1]);
      };
      if (y + 1 < this.grid.length && this.grid[y + 1][x].in) {
        neighbors.push([x, y + 1]);
      };

      return neighbors;
    }
  }, {
    key: "algorithm",
    value: function algorithm() {
      if (this.frontier.length > 0) {

        var index = Math.floor(Math.random() * this.frontier.length);
        var randFrontier = this.frontier[index];

        var x = randFrontier[0];
        var y = randFrontier[1];
        this.frontier.splice(index, 1);

        var neighbors = this.neighbors(x, y);

        var randNeighbor = Math.floor(Math.random() * neighbors.length);
        var nx = neighbors[randNeighbor][0];
        var ny = neighbors[randNeighbor][1];
        var dir = this.direction(x, y, nx, ny);

        if (dir === "N") {
          this.grid[y][x].walls[0] = false;
          this.grid[ny][nx].walls[2] = false;
        } else if (dir === "S") {
          this.grid[y][x].walls[2] = false;
          this.grid[ny][nx].walls[0] = false;
        } else if (dir === "E") {
          this.grid[y][x].walls[1] = false;
          this.grid[ny][nx].walls[3] = false;
        } else {
          this.grid[y][x].walls[3] = false;
          this.grid[ny][nx].walls[1] = false;
        }
        this.grid[y][x].visited = true;
        this.grid[ny][nx].visited = true;

        this.mark(x, y);
      } else {
        this.maze.generating = false;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var maze = this.maze;
      this.algorithm();
      this.grid.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GeneratePrim;
}();

module.exports = GeneratePrim;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = __webpack_require__(0);
var Tree = __webpack_require__(7);

var GenerateKruskal = function () {
  function GenerateKruskal(maze) {
    _classCallCheck(this, GenerateKruskal);

    this.N = "N";
    this.W = "W";
    this.DX = {
      "E": maze.len,
      "W": -maze.len,
      "N": 0,
      "S": 0
    };
    this.DY = {
      "S": maze.len,
      "N": -maze.len,
      "W": 0,
      "E": 0
    };

    this.maze = maze;
    this.edges = [];
    this.createGridAndSet();
    this.createEdges();
    this.algorithm();
  }

  _createClass(GenerateKruskal, [{
    key: 'createGridAndSet',
    value: function createGridAndSet() {
      var maze = this.maze;
      this.grid = [];
      this.sets = [];
      for (var y = 0; y < maze.w / maze.len; y++) {
        this.grid[y] = [];
        this.sets[y] = [];
        for (var x = 0; x < maze.h / maze.len; x++) {
          this.grid[y].push(new Cell(x * maze.len, y * maze.len, maze.len));
          this.sets[y].push(new Tree());
        }
      }
    }
  }, {
    key: 'createEdges',
    value: function createEdges() {
      var maze = this.maze;
      for (var y = 0; y < maze.w / maze.len; y++) {
        for (var x = 0; x < maze.h / maze.len; x++) {
          if (y > 0) {
            this.edges.push([x * maze.len, y * maze.len, this.N]);
          }
          if (x > 0) {
            this.edges.push([x * maze.len, y * maze.len, this.W]);
          }
        }
      }
      this.edges.sort(function (a, b) {
        return 0.5 - Math.random();
      });
    }
  }, {
    key: 'algorithm',
    value: function algorithm() {
      if (this.edges.length > 0) {
        var poppedEdge = this.edges.pop();
        var x = poppedEdge[0];
        var y = poppedEdge[1];
        var dir = poppedEdge[2];

        var nx = x + this.DX[dir];
        var ny = y + this.DY[dir];

        var l = this.maze.len;
        var set1 = this.sets[y / l][x / l];
        var set2 = this.sets[ny / l][nx / l];
        if (!set1.connected(set2)) {

          set1.connect(set2);

          if (dir === "N") {
            this.grid[y / l][x / l].walls[0] = false;
            this.grid[ny / l][nx / l].walls[2] = false;
          } else if (dir === "S") {
            this.grid[y / l][x / l].walls[2] = false;
            this.grid[ny / l][nx / l].walls[0] = false;
          } else if (dir === "E") {
            this.grid[y / l][x / l].walls[1] = false;
            this.grid[ny / l][nx / l].walls[3] = false;
          } else {
            this.grid[y / l][x / l].walls[3] = false;
            this.grid[ny / l][nx / l].walls[1] = false;
          }
        }
        this.grid[y / l][x / l].visited = true;
        this.grid[ny / l][nx / l].visited = true;
      } else {
        this.maze.generating = false;
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var maze = this.maze;
      this.algorithm();
      this.grid.forEach(function (row) {
        row.forEach(function (cell) {
          cell.draw(ctx);
        });
      });
      ctx.strokeRect(0, 0, maze.w, maze.h);
    }
  }]);

  return GenerateKruskal;
}();

module.exports = GenerateKruskal;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  function Tree() {
    _classCallCheck(this, Tree);

    this.parent = null;
  }

  _createClass(Tree, [{
    key: "root",
    value: function root() {
      return this.parent ? this.parent.root() : this;
    }
  }, {
    key: "connected",
    value: function connected(tree) {
      return this.root() === tree.root();
    }
  }, {
    key: "connect",
    value: function connect(tree) {
      return tree.root().parent = this;
    }
  }]);

  return Tree;
}();

module.exports = Tree;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze(canvas) {
    _classCallCheck(this, Maze);

    this.w = canvas.width;
    this.h = canvas.height;
    this.len = 20;
    this.ctx = canvas.getContext('2d');

    this.frameRate = 1000;

    this.generating = true;
    this.solving = false;

    this.generator;
    this.solver;
  }

  _createClass(Maze, [{
    key: "draw",
    value: function draw() {
      if (this.generator) {
        this.generator.draw(this.ctx);
      }
    }
  }, {
    key: "begin",
    value: function begin() {
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      if (this.generating) {
        setTimeout(function () {
          requestAnimationFrame(_this.animate.bind(_this));
          _this.draw();
        }, 1000 / this.frameRate);
      } else {
        $("button").prop("disabled", false);
      }
    }
  }]);

  return Maze;
}();

module.exports = Maze;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map