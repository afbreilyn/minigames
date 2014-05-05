(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var readline = require("readline")
  var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var Game = Hanoi.Game = function() {
    this.towers = [[3,2,1], [], []];
  };

  Game.prototype.play = function() {
    if (this.towers[2].length == 3 || this.towers[1].length == 3) {
      console.log ("YOU WIN!!!!!");
      this.render();
      reader.close()
    } else {
      this.render();
      this.turn();
    };
  };

  Game.prototype.turn = function() {
    var that = this;
    var valid;
    reader.question("From which tower, do you want to move?", function(fromResponse) {
      reader.question("To which tower, do you want to move?", function(toResponse) {
        var from = parseInt(fromResponse);
        var to = parseInt(toResponse);
        valid = that.validMove(from, to);
        if (valid === 1) {
          that.makeMove(from, to);
        }
        else {
          throw "you suck!";
        };
      });
    });
  };

  Game.prototype.validMove = function(from, to) {
    var fromTower = this.towers[from];
    var toTower = this.towers[to];
    if (fromTower.length === 0) {
      return (-1);
    }
    else if (toTower.length === 0) {
      return (1);
    }
    else if (fromTower[from.length - 1] > toTower[to.length - 1]) {
      return (-1);
    }
    else {
      return (1);
    };
  };

  Game.prototype.makeMove = function(from, to) {
    var fromTower = this.towers[from];
    var toTower = this.towers[to];

    toTower.push(fromTower.pop());
    this.play();
  };

  Game.prototype.render = function() {
    console.log(this.towers);
  };

})(this);


var game = new this.Hanoi.Game();
game.play();
