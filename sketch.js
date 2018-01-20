var screenWidth = 800;
var screenHeight = 400;
var cols = 7;
var rows = 7;
var cellSize = 15;
var grid = [];
var xOffset = 200;
var yOffset = 50;

function setup () {
    createCanvas(screenWidth, screenHeight);

    for(row = 0; row < rows; row++) {
        var newRow = [];
        for(col = 0; col < cols - row % 2; col++) {
            var cell = new Cell(row, col);
            cell.active = random(1) > 0.2;
            newRow.push(cell);
        }
        grid.push(newRow);
    }
    

}

function draw () {
    background(249, 247, 243);

    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length;j++) {
            grid[i][j].show();
        }
    }
}

function Cell(row, col) {
    this.row = row;
    this.col = col;

    if(row % 2 === 0) {
        this.x = this.col * cellSize * 3 + xOffset;
    } else {
        this.x = this.col * cellSize * 3 + cellSize * 1.5 + xOffset;
    }
    this.y = this.row * cellSize * 3 + yOffset;

    // Define the corners
    this.topLeft = createVector(this.x - cellSize / 2, this.y - cellSize);
    this.topRight = createVector(this.x + cellSize / 2, this.y - cellSize);
    this.bottomLeft = createVector(this.x - cellSize / 2, this.y + cellSize);
    this.bottomRight = createVector(this.x + cellSize / 2, this.y + cellSize);
    this.middleLeft = createVector(this.x - cellSize, this.y);
    this.middleRight = createVector(this.x + cellSize, this.y);

    this.active = true;
    
    this.hasPlayer = false;

    this.show = function () {
        if(this.active) {

            push(); 
            fill(249, 172, 103);
            stroke(104, 67, 98)
            strokeWeight(3)
            translate(this.x, this.y);
            rectMode(CENTER)
            polygon(0, 0, cellSize, 6);
            pop();

            fill(255, 0, 0);
            
            // Connect the cells
            push();
            strokeWeight(2);
            stroke(104, 67, 98);
            if(this.row % 2 === 0) {
                if(grid[this.row + 1] && grid[this.row + 1][this.col] && grid[this.row + 1][this.col].active) {
                    var connectedCell = grid[this.row + 1][this.col];
                    line(this.bottomRight.x, this.bottomRight.y, connectedCell.topLeft.x, connectedCell.topLeft.y);
                }

                if(grid[this.row + 1] && grid[this.row + 1][this.col - 1] && grid[this.row + 1][this.col - 1].active) {
                    var connectedCell = grid[this.row + 1][this.col - 1];
                    line(this.bottomLeft.x, this.bottomLeft.y, connectedCell.topRight.x, connectedCell.topRight.y);

                }
            } else {
                if(grid[this.row + 1] && grid[this.row + 1][this.col] && grid[this.row + 1][this.col].active) {
                    var connectedCell = grid[this.row + 1][this.col];
                    line(this.bottomLeft.x, this.bottomLeft.y, connectedCell.topRight.x, connectedCell.topRight.y);
                }

                if(grid[this.row + 1] && grid[this.row + 1][this.col + 1] && grid[this.row + 1][this.col + 1].active) {
                    var connectedCell = grid[this.row + 1][this.col + 1];
                    line(this.bottomRight.x, this.bottomRight.y, connectedCell.topLeft.x, connectedCell.topLeft.y);

                }
            }

            if(grid[this.row][this.col + 1] && grid[this.row][this.col + 1].active) {
                var connectedCell = grid[this.row][this.col + 1];
                line(this.middleRight.x, this.middleRight.y, connectedCell.middleLeft.x, connectedCell.middleLeft.y);
            }
            pop();
        }
    }
}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}   