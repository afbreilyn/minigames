(function (root) {
  var ticTacToe = root.ticTacToe = (root.ticTacToe || {});

  var readline = require("readline")
  var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var Game = ticTacToe.Game = function() {
    this.board = [[ "", "", ""], [ "", "", ""], [ "", "", ""]];
  };

  Game.prototype.play = function(myPiece) {
    this.myPiece = myPiece;
    if (this.won(this.board) === 1) {
      console.log (myPiece + " LOSES!!!!!");
      this.render();
      reader.close()
    }
    else {
      this.render();
      this.turn();
    };
  };

  Game.prototype.won = function(board) {

    for(var i = 0; i < 3; i++) {
      if ((this.board[i][0] === this.board[i][1]) && (this.board[i][0]=== this.board[i][2]) && (this.board[i][0] !== "")) {
        console.log("meow");
        return 1;
      }
      else if ((this.board[0][i] === this.board[1][i]) && (this.board[0][i]=== this.board[2][i]) && (this.board[0][i] !== ""))  {
        // console.log("meow");
        return 1;
      };
      console.log(i)
    };

    if (((this.board[0][0] === this.board[1][1]) && (this.board[0][0]=== this.board[2][2]) && (this.board[0][0] !== "")) ||
         ((this.board[0][2] === this.board[1][1]) && (this.board[0][2]=== this.board[2][0]) && (this.board[2][0] !== ""))) {
      return 1;
    }
    else {
       return -1;
    };
  };

  Game.prototype.turn = function() {
    var that = this;
    var valid;
    reader.question("x-coordinate?", function(xCoord) {
      reader.question("y-coordinate?", function(yCoord) {
        var row = parseInt(xCoord);
        var col = parseInt(yCoord);
        valid = that.validMove(row, col);
        if (valid === 1) {
          that.makeMove(row, col);
        }
        else {
          throw "you suck!";
        };
      });
    });
  };

  Game.prototype.validMove = function(row, col) {
    if ((row < 3 && row >= 0) && (col < 3 && col >= 0)) {
      if (this.board[row][col] === "") {
        return 1;
      }
      else {
        return -1;
      };
    }
    else {
      return -1;
    };

  };

  Game.prototype.makeMove = function(row, col) {
    this.board[row][col] = this.myPiece;
    if (this.myPiece === 'x') {
      this.play('o');
    } else {
      this.play('x');
    }

  };

  Game.prototype.render = function() {
    console.log(this.board);
  };

})(this);


var game = new this.ticTacToe.Game();
game.play("x");
