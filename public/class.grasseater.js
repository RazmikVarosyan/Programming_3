class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 12;
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x-1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y+1],
            [this.x, this.y+1],
            [this.x + 1, this.y + 1],
            [this.x+1, this.y],
            [this.x + 1, this.y - 1],
            [this.x, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 1, this.y - 1]
        ];

    }
    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num); 
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy--;
                this.acted = true;
                if (this.energy == 0) {
                    this.die();
                }
            }

        }
    }
    eat() {
        var newCell = random(this.chooseCell(1));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                this.acted = true;
                if (this.energy >= 14) {
                    this.mul();
                    this.energy = 6;
                }
            }
            else {
                this.move();
            }

        }

    }


    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new GrassEater(newX, newY, 2);
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }

}