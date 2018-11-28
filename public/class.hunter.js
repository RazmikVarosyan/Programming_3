class Hunter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 15;
        this.multiply = 0;
        this.directions = [];

    }
    getNewCoordinates() {
        for (var x = 0; x < matrix[0].length; x++) {
            this.directions.push([x, this.y]);
        }
    }
    chooseCell(num) {
        this.getNewCoordinates();
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
        if (this.acted == false) {

            var newCell = random(this.chooseCell(0));
            var newCell1 = random(this.chooseCell(1));

            var f = random([newCell, newCell1]);
            if (f) {
                var newX = f[0];
                var newY = f[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.eat();
                this.acted = true;

            }
        }
    }
    eat() {

        var xotakerner = this.chooseCell(2);
        var gishatichner = this.chooseCell(3);
        var finals = xotakerner.concat(gishatichner);
        for (var i in finals) {
            var verX = finals[i][0];
            var verY = finals[i][1];
            matrix[verY][verX] = 0;
        }
        this.energy++;


    }
    // mul(){
    //     var newCell = random(this.chooseCell([2,3]));
    //     if (newCell) {
    //         var newX = newCell[0];
    //         var newY = newCell[1];
    //         matrix[newY][newX] = new Hunter(newX, newY, 4);
    //     }
    // }
    die() {
        matrix[this.y][this.x] = 0;
    }
}